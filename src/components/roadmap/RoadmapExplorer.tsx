import { ArrowLeftIcon } from "lucide-react"
import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RoadmapSegment, RoadmapStrand } from "@/lib/roadmap"
import { filterRoadmap, type RoadmapFilter } from "@/lib/roadmap-domain"
import { getRoadmapLayout, ROADMAP_ROW_HEIGHT as ROW } from "@/lib/roadmap-geometry"
import { readRoadmapProgress, readRoadmapSubject, resolveRoadmapHash, roadmapUrl } from "@/lib/roadmap-identity"

const anchor = (id: string) => `segment-${id.toLowerCase()}`
const PROGRESS_KEY = "physica.roadmap.checklist.v1"

function UpArrow() {
  return (
    <svg
      className="block size-[1.1rem] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 19V5M6 11L12 5L18 11" />
    </svg>
  )
}

export default function RoadmapExplorer({
  segments,
  strands,
  subjectOverviews = [],
  children: content,
}: {
  segments: RoadmapSegment[]
  strands: RoadmapStrand[]
  subjectOverviews?: { id: string; title: string }[]
  children?: ReactNode
}) {
  const [selected, setSelected] = useState("")
  const [domain, setDomain] = useState<RoadmapFilter>("all")
  const [focusedStrand, setFocusedStrand] = useState("")
  const [mobileView, setMobileView] = useState("path")
  const panels = useRef<HTMLDivElement>(null)
  const mapScroller = useRef<HTMLDivElement>(null)
  const detailScroller = useRef<HTMLDivElement>(null)
  const graphScroller = useRef<HTMLElement>(null)
  const graphDrag = useRef<{ startX: number; scrollLeft: number } | null>(null)
  const visibleSegments = useMemo(
    () => filterRoadmap(segments, domain, focusedStrand),
    [segments, domain, focusedStrand],
  )
  const strandLabel = (id: string) => {
    const overview = subjectOverviews.find((subject) => subject.id === id)
    if (overview) return overview.title
    const name = id.split("/").at(-1)?.replaceAll("-", " ") ?? id
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  const strandOptions = strands
    .filter((strand) => domain === "all" || strand.id.startsWith(`${domain}/`))
    .sort((left, right) => strandLabel(left.id).localeCompare(strandLabel(right.id), "en", { sensitivity: "base" }))
  const visibleStrands = useMemo(
    () => strands.filter((strand) => visibleSegments.some((segment) => segment.strand === strand.id)),
    [strands, visibleSegments],
  )
  const { edges, nodeX, laneCount } = useMemo(
    () => getRoadmapLayout(visibleSegments, visibleStrands),
    [visibleSegments, visibleStrands],
  )
  const lanes = visibleStrands.map(({ id }) => id)
  const strandById = new Map(strands.map((strand) => [strand.id, strand]))
  const graphWidth = laneCount * 15 + 25
  const current = segments.find((segment) => segment.id === selected)
  const children = segments.filter((segment) => segment.dependencies.includes(selected))
  const connected = new Set(
    current ? [current.id, ...current.dependencies, ...children.map((segment) => segment.id)] : [],
  )
  for (const edge of edges) {
    if (edge.source === selected) connected.add(edge.target)
    if (edge.target === selected) connected.add(edge.source)
  }
  const byId = new Map(segments.map((segment) => [segment.id, segment]))
  const color = (id: string) => strandById.get(byId.get(id)?.strand ?? "")?.color ?? "var(--foreground-2)"
  const x = (id: string) => nodeX.get(id) ?? 12

  useEffect(() => {
    const scroller = graphScroller.current
    if (!scroller || !visibleSegments.some((segment) => segment.id === selected)) return
    const revealNode = () => {
      const node = scroller.querySelector<SVGCircleElement>("[data-selected=true]")
      if (!node || !scroller.clientWidth) return
      const center = node.cx.baseVal.value + 10
      const padding = 12
      if (center - padding < scroller.scrollLeft) scroller.scrollLeft = center - padding
      else if (center + padding > scroller.scrollLeft + scroller.clientWidth)
        scroller.scrollLeft = center + padding - scroller.clientWidth
    }
    revealNode()
    const observer = new ResizeObserver(revealNode)
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [selected, visibleSegments])
  // Paint shared strokes together so antialiased edges do not accumulate at overlaps.
  const edgePaths = [false, true]
    .flatMap((active) =>
      lanes.map((lane) => ({
        lane,
        active,
        d: edges
          .filter(
            ({ source, target, lane: edgeLane }) =>
              edgeLane === lane && (source === selected || target === selected) === active,
          )
          .map(({ d }) => d)
          .join(" "),
      })),
    )
    .filter(({ d }) => d)

  const reveal = useCallback((id: string) => {
    const row = document.getElementById(anchor(id))
    if (!row) return
    const scroller = mapScroller.current
    if (!scroller?.clientHeight) return
    const bounds = row.getBoundingClientRect()
    const viewport = scroller.getBoundingClientRect()
    const inset = 24
    if (bounds.top < viewport.top + inset)
      scroller.scrollBy({ top: bounds.top - viewport.top - inset, behavior: "instant" })
    else if (bounds.bottom > viewport.bottom - inset)
      scroller.scrollBy({ top: bounds.bottom - viewport.bottom + inset, behavior: "instant" })
  }, [])

  function changeDomain(value: RoadmapFilter) {
    setDomain(value)
    requestAnimationFrame(() => {
      if (current && (value === "all" || current.domain === value)) reveal(current.id)
      else mapScroller.current?.scrollTo({ top: 0, behavior: "instant" })
    })
  }

  function changeStrand(value: string) {
    setFocusedStrand(value)
    setSelected("")
    const url = roadmapUrl(location.href, value, "")
    if (url !== location.pathname + location.search + location.hash) history.pushState(null, "", url)
    mapScroller.current?.scrollTo({ top: 0, behavior: "instant" })
    detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
  }

  function openOverview(subject: string) {
    changeStrand(subject)
    setMobileView("details")
    requestAnimationFrame(() => {
      detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
      document.getElementById("roadmap-overview")?.focus({ preventScroll: true })
    })
  }

  function choose(id: string, hash = `#${anchor(id)}`, openDetails = true) {
    if (!byId.has(id)) return
    const subject =
      focusedStrand && filterRoadmap(segments, "all", focusedStrand).some((segment) => segment.id === id)
        ? focusedStrand
        : ""
    setFocusedStrand(subject)
    if (!visibleSegments.some((segment) => segment.id === id)) {
      if (domain !== "all" && byId.get(id)?.domain !== domain) setDomain("all")
    }
    setSelected(id)
    const url = roadmapUrl(location.href, subject, hash)
    if (url !== location.pathname + location.search + location.hash) history.pushState(null, "", url)
    const mobile = window.matchMedia("(width < 850px)").matches
    if (mobile && openDetails) setMobileView("details")
    requestAnimationFrame(() => {
      if (mobile && openDetails) {
        detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
        document.getElementById(`panel-${id.toLowerCase()}`)?.focus({ preventScroll: true })
      } else {
        detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
        reveal(id)
      }
    })
  }
  function scrollToTop() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    detailScroller.current?.scrollTo({ top: 0, behavior })
  }

  function scrollMapToTop() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    mapScroller.current?.scrollTo({ top: 0, behavior })
  }

  function showPath() {
    setMobileView("path")
    requestAnimationFrame(() => {
      reveal(selected)
      document.getElementById(anchor(selected))?.focus({ preventScroll: true })
    })
  }
  function followConnection(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]")
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (link.origin !== location.origin || link.pathname !== location.pathname) return
    if (new URL(link.href).searchParams.has("subject") && !link.hash) {
      event.preventDefault()
      openOverview(readRoadmapSubject(link.search, strands))
      return
    }
    const target = resolveRoadmapHash(link.hash, segments)
    if (!target) return
    event.preventDefault()
    choose(target.id, target.hash)
    if (target.hash.includes("--"))
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView({ block: "nearest" }),
      )
  }

  useEffect(() => {
    function restore() {
      const subject = readRoadmapSubject(location.search, strands)
      const visible = filterRoadmap(segments, "all", subject)
      const target = resolveRoadmapHash(location.hash, visible)
      const match = visible.find((segment) => segment.id === target?.id)
      const heading = document.getElementById(location.hash.slice(1))
      const subjectHeading =
        subject && heading?.closest<HTMLElement>("[data-subject-panel]")?.dataset.subjectPanel === subject
          ? heading
          : null
      const hash = target?.hash ?? (subjectHeading ? location.hash : "")
      const url = roadmapUrl(location.href, subject, hash)
      if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url)
      setDomain("all")
      setFocusedStrand(subject)
      setSelected(match?.id ?? "")
      if (match || subject) {
        const mobile = window.matchMedia("(width < 850px)").matches
        if (mobile && (match || subject)) setMobileView("details")
        requestAnimationFrame(() => {
          if (match) window.scrollTo({ top: 0, behavior: "instant" })
          if (mobile && match) detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
          else if (match) {
            detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
            reveal(match.id)
          } else detailScroller.current?.scrollTo({ top: 0, behavior: "instant" })
          if (subjectHeading) subjectHeading.scrollIntoView({ block: "nearest" })
          if (target?.hash.includes("--"))
            document.getElementById(target.hash.slice(1))?.scrollIntoView({ block: "nearest" })
        })
      }
    }
    restore()
    window.addEventListener("popstate", restore)
    window.addEventListener("hashchange", restore)
    return () => {
      window.removeEventListener("popstate", restore)
      window.removeEventListener("hashchange", restore)
    }
  }, [segments, strands, reveal])

  // The slot contains Astro-rendered MDX, including any hydrated MDX components.
  // Toggle its panels without replacing their DOM or injecting HTML strings.
  useEffect(() => {
    for (const panel of panels.current?.querySelectorAll<HTMLElement>("[data-segment-panel]") ?? []) {
      panel.hidden = panel.dataset.segmentPanel !== selected
    }
    for (const panel of panels.current?.querySelectorAll<HTMLElement>("[data-subject-panel]") ?? []) {
      panel.hidden = Boolean(selected) || panel.dataset.subjectPanel !== focusedStrand
    }
  }, [selected, focusedStrand])

  useEffect(() => {
    const container = panels.current
    if (!container) return
    let completed = new Set<string>()
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "[]")
      completed = readRoadmapProgress(stored)
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]))
    } catch {
      // Keep the checklist usable when browser storage is unavailable.
    }
    for (const panel of container.querySelectorAll<HTMLElement>("[data-segment-panel]")) {
      for (const input of panel.querySelectorAll<HTMLInputElement>('.task-list-item input[type="checkbox"]')) {
        const text = input.closest("li")?.textContent?.trim() ?? "Topic"
        const key = JSON.stringify([panel.dataset.segmentPanel, text])
        input.dataset.progressKey = key
        input.setAttribute("aria-label", text)
        input.disabled = false
        input.checked = completed.has(key)
      }
    }
    function save(event: Event) {
      const input = event.target
      if (!(input instanceof HTMLInputElement) || !input.dataset.progressKey) return
      if (input.checked) completed.add(input.dataset.progressKey)
      else completed.delete(input.dataset.progressKey)
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]))
      } catch {
        // Keep the checklist usable when browser storage is unavailable.
      }
    }
    container.addEventListener("change", save)
    return () => container.removeEventListener("change", save)
  }, [])

  return (
    <section
      data-roadmap
      style={{ "--ring": current ? color(current.id) : "var(--accent-1)" } as CSSProperties}
      className="group/roadmap h-[calc(100dvh-4rem)] min-h-0 text-foreground-0 [&_button]:cursor-pointer [&_button]:transition-none [&_button]:active:translate-y-0 [&_:is(button,a,input,summary):focus-visible]:outline-2 [&_:is(button,a,input,summary):focus-visible]:outline-ring [&_:is(button,a,input,summary):focus-visible]:-outline-offset-2"
      aria-label="Physics curriculum explorer"
      data-mobile-view={mobileView}
    >
      <div
        data-roadmap-columns
        className="grid h-full min-h-0 grid-cols-2 gap-8 p-(--page-gutter) max-[850px]:flex max-[850px]:flex-col max-[850px]:gap-0"
      >
        <nav
          className="hidden max-[850px]:mb-5 max-[850px]:flex max-[850px]:shrink-0 max-[850px]:rounded-lg max-[850px]:bg-background-1"
          aria-label="Roadmap view"
        >
          <button
            type="button"
            className="flex-1 rounded-lg px-2 py-[.85rem] text-[.8rem] aria-pressed:bg-background-2 aria-pressed:text-accent-1"
            aria-pressed={mobileView === "path"}
            onClick={showPath}
          >
            Learning path
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg px-2 py-[.85rem] text-[.8rem] aria-pressed:bg-background-2 aria-pressed:text-accent-1"
            aria-pressed={mobileView === "details"}
            onClick={() => setMobileView("details")}
          >
            Segment details
          </button>
        </nav>
        <div
          data-roadmap-path
          className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-xl bg-background-1 max-[850px]:h-auto max-[850px]:flex-1 max-[850px]:group-data-[mobile-view=details]/roadmap:hidden"
        >
          <div
            data-roadmap-column-header
            className="roadmap-map-header flex shrink-0 flex-wrap items-center gap-x-2 bg-background-1 p-5 font-mono text-xs max-[450px]:p-4"
          >
            <div data-roadmap-heading-text className="flex min-w-0 basis-full items-center justify-between gap-3 pb-2">
              <h2>The learning path</h2>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-foreground-2" aria-live="polite">
                  {visibleSegments.length} segments
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Scroll to top of learning path"
                  title="Scroll to top of learning path"
                  onClick={scrollMapToTop}
                >
                  <UpArrow />
                </Button>
              </div>
            </div>
            <fieldset className="flex flex-1 items-center gap-1 py-1">
              <legend className="sr-only">Filter learning path</legend>
              {(
                [
                  ["all", "All"],
                  ["physics", "Physics"],
                  ["mathematics", "Mathematics"],
                ] as const
              ).map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  size="xs"
                  variant="ghost"
                  className={
                    domain === value
                      ? "bg-background-2 text-accent-1 hover:bg-background-2 hover:text-accent-1 dark:hover:bg-background-2"
                      : "text-foreground-2"
                  }
                  aria-pressed={domain === value}
                  aria-controls="roadmap-map"
                  onClick={() => changeDomain(value)}
                >
                  {label}
                </Button>
              ))}
            </fieldset>
            <div className="flex w-full min-w-0 basis-full flex-col gap-2 pt-2">
              <div className="flex min-w-0 items-center gap-3">
                <label htmlFor="roadmap-strand" className="shrink-0">
                  Subject
                </label>
                <Select
                  value={focusedStrand || "all"}
                  onValueChange={(value) => changeStrand(value === "all" ? "" : value)}
                >
                  <SelectTrigger id="roadmap-strand" size="sm" className="min-w-0 flex-1 font-mono text-xs">
                    <SelectValue>
                      <span className="truncate">{focusedStrand ? strandLabel(focusedStrand) : "All subjects"}</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper" align="start" className="max-w-[calc(100vw-2rem)] font-mono">
                    <SelectGroup>
                      <SelectItem value="all" className="text-xs">
                        All subjects
                      </SelectItem>
                      {strandOptions.map((strand) => (
                        <SelectItem key={strand.id} value={strand.id} className="text-xs">
                          {strandLabel(strand.id)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div data-roadmap-map-viewport className="relative min-h-0 flex-1">
            <div
              id="roadmap-map"
              ref={mapScroller}
              data-roadmap-map-scroll
              className="h-full scroll-area overflow-y-auto overscroll-contain py-5"
            >
              {visibleSegments.length === 0 && (
                <p role="status" className="p-6 text-sm text-foreground-2">
                  {focusedStrand
                    ? "No segments match this strand and subject."
                    : `No ${domain === "mathematics" ? "mathematics" : "physics"} segments published yet.`}
                </p>
              )}
              <div
                className="grid grid-cols-[min(50%,var(--roadmap-full-gutter))_minmax(0,1fr)] max-[850px]:grid-cols-2"
                style={{ "--roadmap-full-gutter": `${graphWidth}px` } as CSSProperties}
              >
                <section
                  ref={graphScroller}
                  aria-label="Learning path graph; scroll horizontally to explore strands"
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll the graph horizontally.
                  tabIndex={0}
                  className="min-w-0 cursor-grab scroll-area overflow-x-auto overscroll-x-contain active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2"
                  onPointerDown={(event) => {
                    if (event.pointerType !== "mouse" || event.button !== 0) return
                    graphDrag.current = { startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
                    event.currentTarget.setPointerCapture(event.pointerId)
                  }}
                  onPointerMove={(event) => {
                    if (!graphDrag.current) return
                    event.currentTarget.scrollLeft =
                      graphDrag.current.scrollLeft + graphDrag.current.startX - event.clientX
                  }}
                  onPointerUp={() => {
                    graphDrag.current = null
                  }}
                  onPointerCancel={() => {
                    graphDrag.current = null
                  }}
                  onLostPointerCapture={() => {
                    graphDrag.current = null
                  }}
                >
                  <div className="relative" style={{ width: graphWidth, height: visibleSegments.length * ROW }}>
                    <svg
                      data-roadmap-graph
                      className="pointer-events-none absolute top-0 left-2.5"
                      width={graphWidth - 12}
                      height={visibleSegments.length * ROW}
                      aria-hidden="true"
                    >
                      {edgePaths.map(({ lane, active, d }) => (
                        <path
                          key={`${lane}-${active}`}
                          d={d}
                          fill="none"
                          stroke={`color-mix(in srgb, ${strandById.get(lane)?.color} ${active ? 95 : 13}%, var(--background-1))`}
                          strokeWidth={active ? 2.5 : 1.2}
                        />
                      ))}
                      {visibleSegments.map((segment, index) => (
                        <circle
                          key={segment.id}
                          data-selected={segment.id === selected}
                          cx={x(segment.id)}
                          cy={index * ROW + ROW / 2}
                          r={segment.id === selected ? 7 : 4}
                          fill="var(--background-1)"
                          stroke={color(segment.id)}
                          strokeWidth={segment.id === selected ? 3 : 2}
                        />
                      ))}
                    </svg>
                  </div>
                </section>
                <ol data-roadmap-rows className="m-0 min-w-0 list-none p-0 pr-3">
                  {visibleSegments.map((segment) => (
                    <li key={segment.id} className="py-0.5" style={{ height: ROW }}>
                      <button
                        type="button"
                        id={anchor(segment.id)}
                        aria-pressed={selected === segment.id}
                        aria-controls="roadmap-detail"
                        onClick={() => choose(segment.id)}
                        className="grain-surface grain-surface--hover roadmap-segment-row group/segment flex h-full w-full flex-col justify-center gap-2 rounded-lg px-4 py-3 text-left hover:bg-background-2/70 aria-pressed:bg-background-2/70 max-[450px]:px-[.65rem] max-[450px]:py-2"
                        data-connected={connected.has(segment.id)}
                        style={
                          {
                            "--segment-color": color(segment.id),
                            "--grain-color": color(segment.id),
                            "--ring": color(segment.id),
                          } as CSSProperties
                        }
                      >
                        <span
                          data-roadmap-row-meta
                          className="flex justify-between gap-2 font-mono text-[.65rem] text-foreground-3 group-data-[connected=true]/segment:text-(--segment-color) max-[450px]:text-[.6rem]"
                        >
                          <span className="min-w-0 truncate">{segment.subject}</span>
                          <span className="shrink-0">{segment.stage}</span>
                        </span>
                        <span
                          data-roadmap-row-title
                          className="text-[.85rem] leading-[1.35] text-foreground-1 group-aria-pressed/segment:font-semibold group-aria-pressed/segment:text-foreground-0 max-[450px]:text-[.8rem]"
                        >
                          {segment.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <aside
          className="flex h-full min-h-0 min-w-0 flex-col **:[[hidden]]:hidden! max-[850px]:h-auto max-[850px]:flex-1 max-[850px]:group-data-[mobile-view=path]/roadmap:hidden"
          id="roadmap-detail"
          aria-label={current ? "Selected segment" : "Subject overview"}
        >
          <div
            data-roadmap-column-header
            className="z-10 flex shrink-0 items-start gap-5 bg-background-0/95 px-5 pt-5 pb-4 font-mono text-xs backdrop-blur-lg"
          >
            <div
              data-roadmap-heading-text
              className="flex min-w-0 flex-1 items-center justify-between gap-3 [&>span]:text-foreground-2"
            >
              {current ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="min-w-0 shrink gap-2 font-mono text-xs"
                  title={`Back to ${strandLabel(focusedStrand || current.strand)} overview`}
                  aria-label={`Back to ${strandLabel(focusedStrand || current.strand)} overview`}
                  onClick={() => openOverview(focusedStrand || current.strand)}
                >
                  <ArrowLeftIcon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{strandLabel(focusedStrand || current.strand)} overview</span>
                </Button>
              ) : (
                <h2>Overview</h2>
              )}
              <span aria-live="polite">{current?.stage}</span>
            </div>
            <div data-roadmap-heading-actions className="flex shrink-0 items-center justify-center">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Scroll to top of segment"
                title="Scroll to top of segment"
                onClick={scrollToTop}
              >
                <UpArrow />
              </Button>
            </div>
          </div>
          <div data-roadmap-detail-viewport className="relative min-h-0 flex-1">
            <div
              data-roadmap-detail-body
              className="h-full scroll-area overflow-y-auto overscroll-contain px-5 pt-10 pb-12 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2"
              ref={detailScroller}
            >
              <div id="roadmap-overview" tabIndex={-1} className="outline-none" />
              {!current && !subjectOverviews.some((subject) => subject.id === focusedStrand) && (
                <div>
                  <h1 className="mb-6 font-display text-4xl font-medium tracking-tight text-foreground-0">
                    {focusedStrand ? strandLabel(focusedStrand) : "Explore the roadmap"}
                  </h1>
                  <p className="text-sm leading-relaxed text-foreground-2">
                    {focusedStrand
                      ? "Explore this subject through its segments and direct prerequisites. Choose a segment from the learning path to see its topics."
                      : "Choose a subject to focus the map, or select a segment from the learning path to see its topics."}
                  </p>
                  {!focusedStrand && (
                    <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                      {strandOptions.map((strand) => (
                        <li key={strand.id}>
                          <a
                            className="grain-surface grain-surface--hover flex h-full items-center rounded-lg bg-background-1 px-4 py-3 text-foreground-1 transition-colors duration-300 hover:bg-background-2/70 hover:text-accent-1 focus-visible:text-accent-1 motion-reduce:transition-none"
                            href={`?subject=${strand.id.split("/").at(-1)}`}
                            onClick={(event) => {
                              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                              event.preventDefault()
                              openOverview(strand.id)
                            }}
                          >
                            {strandLabel(strand.id)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-4 font-mono text-xs text-foreground-2">
                    {visibleSegments.length} segments in this view
                  </p>
                </div>
              )}
              {/* Links and checkboxes in the server-rendered MDX retain native keyboard behaviour. */}
              {/* biome-ignore lint/a11y/noStaticElementInteractions: Delegates native anchor clicks in the Astro slot. */}
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: Native anchors already dispatch keyboard clicks. */}
              <div ref={panels} onClick={followConnection}>
                {content}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
