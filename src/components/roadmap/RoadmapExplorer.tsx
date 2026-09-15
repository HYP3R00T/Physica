import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import type { RoadmapSegment, RoadmapStrand } from "@/lib/roadmap"
import { filterRoadmap, type RoadmapFilter } from "@/lib/roadmap-domain"
import { getRoadmapLayout, ROADMAP_ROW_HEIGHT as ROW } from "@/lib/roadmap-geometry"
import { readRoadmapProgress, resolveRoadmapHash } from "@/lib/roadmap-identity"

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
  children: content,
}: {
  segments: RoadmapSegment[]
  strands: RoadmapStrand[]
  children?: ReactNode
}) {
  const [selected, setSelected] = useState(segments[0].id)
  const [domain, setDomain] = useState<RoadmapFilter>("all")
  const [mobileView, setMobileView] = useState("path")
  const panels = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const columns = useRef<HTMLDivElement>(null)
  const graphScroller = useRef<HTMLElement>(null)
  const graphDrag = useRef<{ startX: number; scrollLeft: number } | null>(null)
  const visibleSegments = useMemo(() => filterRoadmap(segments, domain), [segments, domain])
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
  const current = segments.find((segment) => segment.id === selected) ?? segments[0]
  const children = segments.filter((segment) => segment.dependencies.includes(current.id))
  const connected = new Set([current.id, ...current.dependencies, ...children.map((segment) => segment.id)])
  for (const edge of edges) {
    if (edge.source === current.id) connected.add(edge.target)
    if (edge.target === current.id) connected.add(edge.source)
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
    const bounds = row.getBoundingClientRect()
    const header = columns.current?.querySelector<HTMLElement>("[data-roadmap-column-header]")
    const offset = header ? Number.parseFloat(getComputedStyle(header).top) + header.offsetHeight : 120
    const bottom = columns.current?.getBoundingClientRect().bottom ?? window.innerHeight
    const maxScroll = Math.max(0, window.scrollY + bottom - window.innerHeight)
    const needsReveal = bounds.top < offset || bounds.bottom > window.innerHeight
    if (needsReveal || window.scrollY > maxScroll) {
      const target = needsReveal ? window.scrollY + bounds.top - offset : window.scrollY
      window.scrollTo({ top: Math.max(0, Math.min(target, maxScroll)), behavior: "instant" })
    }
  }, [])

  function changeDomain(value: RoadmapFilter) {
    setDomain(value)
    requestAnimationFrame(() => {
      if (value === "all" || current.domain === value) reveal(current.id)
      else window.scrollTo({ top: 0, behavior: "instant" })
    })
  }

  function choose(id: string, hash = `#${anchor(id)}`, openDetails = true) {
    if (!byId.has(id)) return
    if (domain !== "all" && byId.get(id)?.domain !== domain) setDomain("all")
    setSelected(id)
    if (location.hash !== hash) history.pushState(null, "", hash)
    const mobile = window.matchMedia("(width < 850px)").matches
    if (mobile && openDetails) setMobileView("details")
    requestAnimationFrame(() => {
      if (mobile && openDetails) {
        columns.current?.scrollIntoView({ block: "start" })
        document.getElementById(`panel-${id.toLowerCase()}`)?.focus({ preventScroll: true })
      } else reveal(id)
    })
  }
  function scrollToTop(target: "page" | "segment") {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    if (target === "page") {
      window.scrollTo({ top: 0, behavior })
    } else if (window.matchMedia("(width < 850px)").matches) {
      columns.current?.scrollIntoView({ block: "start", behavior })
    } else {
      body.current?.scrollTo({ top: 0, behavior })
    }
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
      const target = resolveRoadmapHash(location.hash, segments)
      const match = segments.find((segment) => segment.id === target?.id)
      if (target && location.hash !== target.hash) history.replaceState(null, "", target.hash)
      const selectedSegment = match ?? segments[0]
      setDomain((active) => (active === "all" || active === selectedSegment.domain ? active : "all"))
      setSelected(selectedSegment.id)
      if (match) {
        const mobile = window.matchMedia("(width < 850px)").matches
        if (mobile) setMobileView("details")
        requestAnimationFrame(() => {
          if (mobile) columns.current?.scrollIntoView({ block: "start" })
          else reveal(match.id)
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
  }, [segments, reveal])

  // The slot contains Astro-rendered MDX, including any hydrated MDX components.
  // Toggle its panels without replacing their DOM or injecting HTML strings.
  useEffect(() => {
    for (const panel of panels.current?.querySelectorAll<HTMLElement>("[data-segment-panel]") ?? []) {
      panel.hidden = panel.dataset.segmentPanel !== selected
    }
    if (body.current) body.current.scrollTop = 0
  }, [selected])

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
      style={{ "--ring": color(current.id) } as CSSProperties}
      className="group/roadmap text-foreground-0 [&_button]:cursor-pointer [&_:is(button,a,input,summary):focus-visible]:outline-2 [&_:is(button,a,input,summary):focus-visible]:outline-ring [&_:is(button,a,input,summary):focus-visible]:-outline-offset-2"
      aria-label="Physics curriculum explorer"
      data-mobile-view={mobileView}
    >
      <div
        data-roadmap-columns
        className="grid min-h-[calc(100dvh-4rem)] scroll-mt-16 grid-cols-2 items-start max-[850px]:block max-[850px]:min-h-0"
        ref={columns}
      >
        <nav
          className="hidden max-[850px]:sticky max-[850px]:top-16 max-[850px]:z-20 max-[850px]:flex max-[850px]:border-b max-[850px]:border-border max-[850px]:bg-background-0"
          aria-label="Roadmap view"
        >
          <button
            type="button"
            className="flex-1 border-b-2 border-transparent px-2 py-[.85rem] text-[.8rem] aria-pressed:border-accent-1 aria-pressed:text-accent-1"
            aria-pressed={mobileView === "path"}
            onClick={showPath}
          >
            Learning path
          </button>
          <button
            type="button"
            className="flex-1 border-b-2 border-transparent px-2 py-[.85rem] text-[.8rem] aria-pressed:border-accent-1 aria-pressed:text-accent-1"
            aria-pressed={mobileView === "details"}
            onClick={() => setMobileView("details")}
          >
            Segment details
          </button>
        </nav>
        <div
          data-roadmap-path
          className="min-w-0 self-stretch border-r border-border max-[850px]:border-r-0 max-[850px]:group-data-[mobile-view=details]/roadmap:hidden"
        >
          <div
            data-roadmap-column-header
            className="flex min-h-12 flex-wrap items-stretch border-b border-border font-mono text-xs sticky top-16 z-10 bg-background-0 max-[850px]:top-[6.9rem] max-[850px]:grid max-[850px]:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div
              data-roadmap-heading-text
              className="flex min-w-40 flex-1 items-center justify-between gap-3 px-4 py-3 [&>span]:text-foreground-2 max-[850px]:min-w-0 max-[850px]:whitespace-nowrap"
            >
              <h2>The learning path</h2>
              <span aria-live="polite">{visibleSegments.length} segments</span>
            </div>
            <fieldset className="flex items-center gap-1 border-l border-border px-2 py-2 max-[850px]:col-span-2 max-[850px]:row-start-2 max-[850px]:justify-center max-[850px]:border-t max-[850px]:border-l-0">
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
                  variant={domain === value ? "secondary" : "ghost"}
                  aria-pressed={domain === value}
                  aria-controls="roadmap-map"
                  onClick={() => changeDomain(value)}
                >
                  {label}
                </Button>
              ))}
            </fieldset>
            <div
              data-roadmap-heading-actions
              className="flex shrink-0 items-center justify-center border-l border-border px-3 py-2 max-[850px]:col-start-2 max-[850px]:row-start-1"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Scroll to top of page"
                title="Scroll to top of page"
                onClick={() => scrollToTop("page")}
              >
                <UpArrow />
              </Button>
            </div>
          </div>
          <div id="roadmap-map">
            {visibleSegments.length === 0 && (
              <p role="status" className="p-6 text-sm text-foreground-2">
                No {domain === "mathematics" ? "mathematics" : "physics"} segments published yet.
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
                className="min-w-0 cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2"
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
                        stroke={`color-mix(in srgb, ${strandById.get(lane)?.color} ${active ? 95 : 13}%, var(--background-0))`}
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
                        fill="var(--background-0)"
                        stroke={color(segment.id)}
                        strokeWidth={segment.id === selected ? 3 : 2}
                      />
                    ))}
                  </svg>
                </div>
              </section>
              <ol data-roadmap-rows className="m-0 min-w-0 list-none p-0">
                {visibleSegments.map((segment) => (
                  <li key={segment.id} style={{ height: ROW }}>
                    <button
                      type="button"
                      id={anchor(segment.id)}
                      aria-pressed={selected === segment.id}
                      aria-controls="roadmap-detail"
                      onClick={() => choose(segment.id, undefined, selected === segment.id)}
                      className="group/segment flex h-full w-full scroll-mt-32 flex-col justify-center gap-2 border-b border-l-2 border-b-border border-l-transparent px-4 py-3 text-left hover:bg-background-1 aria-pressed:border-l-(--segment-color) aria-pressed:bg-(--segment-color)/8 max-[450px]:px-[.65rem] max-[450px]:py-2"
                      data-connected={connected.has(segment.id)}
                      style={{ "--segment-color": color(segment.id), "--ring": color(segment.id) } as CSSProperties}
                    >
                      <span
                        data-roadmap-row-meta
                        className="flex justify-between gap-2 font-mono text-[.65rem] text-foreground-3 group-data-[connected=true]/segment:text-(--segment-color) max-[450px]:text-[.6rem]"
                      >
                        <span className="min-w-0 truncate">{segment.subject}</span>
                        <span className="shrink-0">{segment.scope}</span>
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
        <aside
          className="sticky top-16 flex max-h-[calc(100dvh-4rem)] min-w-0 flex-col **:[[hidden]]:hidden! max-[850px]:static max-[850px]:max-h-none max-[850px]:group-data-[mobile-view=path]/roadmap:hidden"
          id="roadmap-detail"
          aria-label="Selected segment"
        >
          <div
            data-roadmap-column-header
            className="flex min-h-12 items-stretch border-b border-border font-mono text-xs shrink-0"
          >
            <div
              data-roadmap-heading-text
              className="flex min-w-0 flex-1 items-center justify-between gap-3 px-6 py-3 [&>span]:text-foreground-2"
            >
              <h2>In this segment</h2>
              <span aria-live="polite">{current.scope}</span>
            </div>
            <div
              data-roadmap-heading-actions
              className="flex shrink-0 items-center justify-center border-l border-border px-3 py-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Scroll to top of segment"
                title="Scroll to top of segment"
                onClick={() => scrollToTop("segment")}
              >
                <UpArrow />
              </Button>
            </div>
          </div>
          <div
            data-roadmap-detail-body
            className="min-h-0 overflow-y-auto overscroll-contain px-10 pt-8 pb-12 scrollbar-gutter-stable focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 max-[1100px]:p-6 max-[850px]:overflow-visible max-[850px]:p-6"
            ref={body}
          >
            {/* Links and checkboxes in the server-rendered MDX retain native keyboard behaviour. */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: Delegates native anchor clicks in the Astro slot. */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: Native anchors already dispatch keyboard clicks. */}
            <div ref={panels} onClick={followConnection}>
              {content}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
