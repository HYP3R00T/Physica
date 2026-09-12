import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import type { RoadmapSegment } from "@/lib/roadmap"
import { roadmapLanes } from "@/lib/roadmap-lanes"

const ROW = 96
const lanes = Object.keys(roadmapLanes)
const anchor = (id: string) => `segment-${id.toLowerCase()}`
const hashId = (hash: string) => hash.match(/^#segment-([a-z]+[1-9][0-9]*)(?:--|$)/i)?.[1].toUpperCase()
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
  children: content,
}: {
  segments: RoadmapSegment[]
  children?: ReactNode
}) {
  const [selected, setSelected] = useState(segments[0].id)
  const [query, setQuery] = useState("")
  const [mobileView, setMobileView] = useState("path")
  const panels = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const columns = useRef<HTMLDivElement>(null)
  const positions = new Map(segments.map((segment, index) => [segment.id, index]))
  const current = segments.find((segment) => segment.id === selected) ?? segments[0]
  const children = segments.filter((segment) => segment.dependencies.includes(current.id))
  const connected = new Set([current.id, ...current.dependencies, ...children.map((segment) => segment.id)])
  const needle = query.trim().toLowerCase()
  const matches = needle
    ? segments.filter((segment) =>
        `${segment.id} ${segment.title} ${segment.subject} ${segment.searchText}`.toLowerCase().includes(needle),
      )
    : []
  const edges = segments.flatMap((target) => target.dependencies.map((source) => ({ source, target: target.id })))
  const byId = new Map(segments.map((segment) => [segment.id, segment]))
  const color = (id: string) => roadmapLanes[byId.get(id)?.lane ?? "methods"].color
  const x = (id: string) => 12 + lanes.indexOf(byId.get(id)?.lane ?? "methods") * 15
  edges.sort(
    (a, b) =>
      Number(a.source === selected || a.target === selected) - Number(b.source === selected || b.target === selected),
  )

  const reveal = useCallback((id: string) => {
    const row = document.getElementById(anchor(id))
    if (!row) return
    const bounds = row.getBoundingClientRect()
    if (bounds.top < 120 || bounds.bottom > window.innerHeight) {
      window.scrollTo({ top: Math.max(0, window.scrollY + bounds.top - 160), behavior: "instant" })
    }
  }, [])

  function choose(id: string, hash = `#${anchor(id)}`) {
    if (!byId.has(id)) return
    setSelected(id)
    if (location.hash !== hash) history.pushState(null, "", hash)
    const mobile = window.matchMedia("(width < 850px)").matches
    if (mobile) setMobileView("details")
    requestAnimationFrame(() => {
      if (mobile) {
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
    const id = hashId(link.hash)
    if (!id || !byId.has(id)) return
    event.preventDefault()
    choose(id, link.hash)
    if (link.hash.includes("--"))
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(link.hash.slice(1)))?.scrollIntoView({ block: "nearest" }),
      )
  }

  useEffect(() => {
    function restore() {
      const id = hashId(location.hash)
      const match = segments.find((segment) => segment.id === id)
      setSelected(match?.id ?? segments[0].id)
      if (match) {
        const mobile = window.matchMedia("(width < 850px)").matches
        if (mobile) setMobileView("details")
        requestAnimationFrame(() => {
          if (mobile) columns.current?.scrollIntoView({ block: "start" })
          else reveal(match.id)
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
      if (Array.isArray(stored))
        completed = new Set(stored.filter((value): value is string => typeof value === "string"))
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
      className="group/roadmap text-foreground-0 [&_button]:cursor-pointer [&_:is(button,a,input,summary):focus-visible]:outline-2 [&_:is(button,a,input,summary):focus-visible]:outline-accent-1 [&_:is(button,a,input,summary):focus-visible]:-outline-offset-2"
      aria-label="Physics curriculum explorer"
      data-mobile-view={mobileView}
    >
      <header
        data-roadmap-header
        className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] items-start gap-12 border-b border-border px-15 py-10 max-[1100px]:gap-8 max-[1100px]:p-8 max-[850px]:grid-cols-1 max-[850px]:gap-6 max-[850px]:p-6"
      >
        <div className="[&>p]:text-base [&>p]:leading-7 [&>p]:text-foreground-2">
          <p className="font-mono text-[.7rem]! leading-[1.75] tracking-[.12em] text-accent-1! uppercase">
            A path through physics
          </p>
          <h1 className="mt-4 mb-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] font-semibold tracking-[-.035em]">
            Follow the connections.
          </h1>
          <p>
            Start with the mathematics, then follow the branches. Choose a segment to see what it covers and the notes
            that go with it.
          </p>
          <p className="mt-3 text-[.8rem]! leading-[1.75] text-foreground-3!">
            {segments.length} segments · Class 10 starting point · Curriculum draft
          </p>
        </div>
        <div className="min-w-0 self-center">
          <div className="relative">
            <label htmlFor="roadmap-search" className="mb-[.6rem] block font-mono text-xs text-foreground-2">
              Find a topic
            </label>
            <input
              id="roadmap-search"
              className="w-full rounded-[.35rem] border border-input bg-background-0 px-[.9rem] py-[.7rem] text-sm"
              type="search"
              placeholder="Try calculus, waves, or Q2"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-controls={needle ? "roadmap-results" : undefined}
            />
            {needle && (
              <div
                id="roadmap-results"
                className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-y-auto border border-border bg-background-0 shadow-[0_8px_24px_#0002]"
              >
                <p role="status" className="px-3 py-2 text-xs text-foreground-2">
                  {matches.length} {matches.length === 1 ? "segment" : "segments"} found
                </p>
                {matches.map((segment) => (
                  <button
                    type="button"
                    key={segment.id}
                    className="block w-full px-3 py-[.65rem] text-left text-[.85rem] hover:bg-background-2"
                    onClick={() => {
                      choose(segment.id)
                      setQuery("")
                    }}
                  >
                    <span className="text-accent-1">{segment.id}</span> {segment.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          <details className="pt-[.8rem] text-[.8rem] leading-[1.7] text-foreground-2 [&>p]:mt-[.8rem]">
            <summary className="cursor-pointer text-foreground-0">How to read this map</summary>
            <p>
              Read downwards. Curves connect a segment to the material it uses. Select a row to highlight its
              connections. The path follows the page scroll; the explanation stays beside it.
            </p>
            <ul className="mt-[.8rem] grid grid-cols-2 gap-1">
              {Object.values(roadmapLanes).map((lane) => (
                <li key={lane.label}>
                  <i className="mr-2 inline-block size-2 rounded-full" style={{ background: lane.color }} />
                  {lane.label}
                </li>
              ))}
            </ul>
            <p>
              Core: develop working fluency. Breadth: explore a branch. Bridge: enter an advanced framework. Synthesis:
              bring subjects together.
            </p>
          </details>
        </div>
      </header>
      <div data-roadmap-columns className="grid scroll-mt-16 grid-cols-2 items-start max-[850px]:block" ref={columns}>
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
            {current.id} · Segment details
          </button>
        </nav>
        <div
          data-roadmap-path
          className="min-w-0 border-r border-border max-[850px]:border-r-0 max-[850px]:group-data-[mobile-view=details]/roadmap:hidden"
        >
          <div
            data-roadmap-column-header
            className="flex min-h-12 items-stretch border-b border-border font-mono text-xs sticky top-16 z-10 bg-background-0 max-[850px]:top-[6.9rem]"
          >
            <div
              data-roadmap-heading-text
              className="flex min-w-0 flex-1 items-center justify-between gap-3 px-6 py-3 [&>span]:text-foreground-2"
            >
              <h2>The learning path</h2>
              <span>{segments.length} segments</span>
            </div>
            <div
              data-roadmap-heading-actions
              className="flex shrink-0 items-center justify-center border-l border-border px-3 py-2"
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
          <div className="relative" style={{ height: segments.length * ROW }}>
            <svg
              data-roadmap-graph
              className="pointer-events-none absolute top-0 left-2.5 max-[450px]:left-0 max-[450px]:origin-left max-[450px]:scale-x-75"
              width="148"
              height={segments.length * ROW}
              aria-hidden="true"
            >
              {edges.map(({ source, target }) => {
                const y1 = (positions.get(source) ?? 0) * ROW + ROW / 2
                const y2 = (positions.get(target) ?? 0) * ROW + ROW / 2
                const active = source === selected || target === selected
                const bend = Math.min(48, (y2 - y1) / 2)
                return (
                  <path
                    key={`${source}-${target}`}
                    d={`M ${x(source)} ${y1} L ${x(source)} ${y2 - bend} C ${x(source)} ${y2 - bend / 2}, ${x(target)} ${y2 - bend / 2}, ${x(target)} ${y2}`}
                    fill="none"
                    stroke={color(source)}
                    strokeWidth={active ? 2.5 : 1.2}
                    opacity={active ? 0.95 : 0.13}
                  />
                )
              })}
              {segments.map((segment, index) => (
                <circle
                  key={segment.id}
                  cx={x(segment.id)}
                  cy={index * ROW + ROW / 2}
                  r={segment.id === selected ? 7 : 4}
                  fill="var(--background-0)"
                  stroke={color(segment.id)}
                  strokeWidth={segment.id === selected ? 3 : 2}
                />
              ))}
            </svg>
            <ol data-roadmap-rows className="m-0 list-none p-0 pl-40 max-[450px]:pl-27.5">
              {segments.map((segment, index) => (
                <li key={segment.id} style={{ height: ROW }}>
                  <button
                    type="button"
                    id={anchor(segment.id)}
                    aria-pressed={selected === segment.id}
                    aria-controls="roadmap-detail"
                    onClick={() => choose(segment.id)}
                    className="group/segment flex h-full w-full scroll-mt-32 flex-col justify-center gap-2 border-b border-l-2 border-b-border border-l-transparent px-4 py-3 text-left hover:bg-background-1 aria-pressed:border-l-(--segment-color) aria-pressed:bg-(--segment-color)/8 max-[450px]:px-[.65rem] max-[450px]:py-2"
                    data-connected={connected.has(segment.id)}
                    style={{ "--segment-color": color(segment.id) } as CSSProperties}
                  >
                    <span
                      data-roadmap-row-meta
                      className="flex justify-between gap-2 font-mono text-[.65rem] text-foreground-3 group-data-[connected=true]/segment:text-(--segment-color) max-[450px]:text-[.6rem]"
                    >
                      <span>
                        {String(index + 1).padStart(2, "0")} / {segment.id}
                      </span>
                      <span>{segment.scope}</span>
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
              <span aria-live="polite">
                {current.id} · {current.scope}
              </span>
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
            className="min-h-0 overflow-y-auto overscroll-contain px-10 pt-8 pb-12 scrollbar-gutter-stable focus-visible:outline-2 focus-visible:outline-accent-1 focus-visible:-outline-offset-2 max-[1100px]:p-6 max-[850px]:overflow-visible max-[850px]:p-6"
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
