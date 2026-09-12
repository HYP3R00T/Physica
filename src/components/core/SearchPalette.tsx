import type Fuse from "fuse.js"
import { BookOpen, FileText, Search, X } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import * as React from "react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { fuseOptions } from "@/lib/search/fuseConfig"
import type { SearchIndex, SearchItem, SearchItemType } from "@/lib/search/types"
import { cn } from "@/lib/utils"

type SearchFilter = "all" | "learn" | "blogs"

const filters: Array<{ label: string; value: SearchFilter }> = [
  { label: "All", value: "all" },
  { label: "Learn", value: "learn" },
  { label: "Blogs", value: "blogs" },
]

const resultLabels: Record<SearchItemType, string> = {
  article: "Blog",
  module: "Module",
  note: "Note",
}

const typeIcons = {
  article: FileText,
  module: BookOpen,
  note: FileText,
}

const resultGroup = (item: SearchItem) => (item.type === "article" ? "blogs" : "learn")

export function SearchPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<SearchFilter>("all")
  const [items, setItems] = React.useState<SearchItem[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [modifierKey, setModifierKey] = React.useState("Ctrl")
  const fuse = React.useRef<Fuse<SearchItem> | null>(null)
  const input = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setModifierKey(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl")

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    if (!open || fuse.current) return

    const loadIndex = async () => {
      setLoading(true)
      setError(false)

      try {
        const [response, { default: FuseSearch }] = await Promise.all([
          fetch("/api/search-index.json", { cache: "no-cache" }),
          import("fuse.js"),
        ])

        if (!response.ok) throw new Error(`Search index returned ${response.status}`)

        const index = (await response.json()) as SearchIndex
        const searchableItems = index.items.filter(
          (item) => item.type === "module" || item.type === "note" || item.type === "article",
        )
        setItems(searchableItems)
        fuse.current = new FuseSearch(searchableItems, fuseOptions)
      } catch (searchError) {
        console.error("Unable to load the search index", searchError)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    void loadIndex()
  }, [open])

  const results = React.useMemo(() => {
    const normalizedQuery = query.trim()
    const matches =
      normalizedQuery && fuse.current ? fuse.current.search(normalizedQuery).map(({ item }) => item) : items
    const filtered = filter === "all" ? matches : matches.filter((item) => resultGroup(item) === filter)
    return filtered.slice(0, 24)
  }, [filter, items, query])

  const groups = React.useMemo(
    () =>
      filters
        .filter(({ value }) => value !== "all")
        .map(({ value, label }) => ({
          type: value,
          label,
          items: results.filter((item) => resultGroup(item) === value),
        }))
        .filter((group) => group.items.length > 0),
    [results],
  )
  const orderedResults = React.useMemo(() => groups.flatMap((group) => group.items), [groups])

  React.useEffect(() => {
    document
      .querySelector<HTMLElement>(`[data-search-result-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const selectResult = (result: SearchItem) => {
    setOpen(false)
    window.location.assign(result.url)
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((current) => Math.max(0, Math.min(current + 1, orderedResults.length - 1)))
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    }

    if (event.key === "Enter" && orderedResults[activeIndex]) {
      event.preventDefault()
      selectResult(orderedResults[activeIndex])
    }
  }

  let resultIndex = -1

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) setQuery("")
      }}
    >
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="group inline-flex h-9 min-w-32 shrink-0 items-center justify-between gap-5 rounded-md border border-border bg-background-0 px-3 text-sm text-foreground-2 transition-colors hover:border-foreground-3 hover:bg-background-1 hover:text-foreground-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={`Search Physica (${modifierKey}+K)`}
          title={`Search Physica (${modifierKey}+K)`}
        >
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <KbdGroup className="inline-flex">
            <Kbd>{modifierKey}</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-100 bg-background-0/75 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed top-[10vh] left-1/2 z-101 flex max-h-[80dvh] w-[min(calc(100%-2rem),44rem)] -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-border bg-background-0 shadow-2xl focus:outline-none"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            input.current?.focus()
          }}
        >
          <DialogPrimitive.Title className="sr-only">Search Physica</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search modules and notes under Learn, or blog posts under Blogs.
          </DialogPrimitive.Description>

          <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
            <Search className="size-5 shrink-0 text-foreground-3" aria-hidden="true" />
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onInputKeyDown}
              className="h-full min-w-0 flex-1 bg-transparent text-base text-foreground-0 outline-none placeholder:text-foreground-3"
              placeholder="Search anything…"
              autoComplete="off"
              spellCheck={false}
            />
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className="rounded-md p-2 text-foreground-3 transition-colors hover:bg-background-1 hover:text-foreground-0"
                aria-label="Close search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
          </div>

          <fieldset
            className="flex shrink-0 items-center gap-1 border-b border-border px-3 py-2"
            aria-label="Search filters"
          >
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => {
                  setFilter(item.value)
                  setActiveIndex(0)
                }}
                className="rounded-md px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground-2 transition-colors hover:bg-background-1 hover:text-foreground-0 aria-pressed:bg-background-2 aria-pressed:text-accent-1"
              >
                {item.label}
              </button>
            ))}
          </fieldset>

          <div
            className="min-h-[min(12rem,30dvh)] flex-1 overflow-y-auto overscroll-contain p-3 scrollbar-gutter-stable"
            role="listbox"
            aria-label="Search results"
          >
            {loading && <p className="px-3 py-10 text-center text-sm text-foreground-3">Preparing search…</p>}
            {error && <p className="px-3 py-10 text-center text-sm text-foreground-3">Search is unavailable.</p>}
            {!loading && !error && results.length === 0 && (
              <p className="px-3 py-10 text-center text-sm text-foreground-3">No matching results found.</p>
            )}

            {!loading &&
              !error &&
              groups.map((group) => (
                <section key={group.type} className="not-first:mt-3" aria-labelledby={`search-${group.type}-label`}>
                  <h2
                    id={`search-${group.type}-label`}
                    className="px-3 py-2 font-mono text-[0.6875rem] tracking-[0.12em] text-foreground-3 uppercase"
                  >
                    {group.label}
                  </h2>
                  <div className="grid gap-1">
                    {group.items.map((result) => {
                      resultIndex += 1
                      const currentIndex = resultIndex
                      const ResultIcon = typeIcons[result.type]
                      const subtitle = result.type === "note" ? result.moduleTitle : result.description

                      return (
                        <button
                          key={result.id}
                          type="button"
                          role="option"
                          aria-selected={activeIndex === currentIndex}
                          data-search-result-index={currentIndex}
                          onMouseEnter={() => setActiveIndex(currentIndex)}
                          onClick={() => selectResult(result)}
                          className={cn(
                            "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-3 py-3 text-left transition-colors",
                            activeIndex === currentIndex ? "bg-background-1" : "hover:bg-background-1",
                          )}
                        >
                          <ResultIcon className="size-4 text-foreground-3" aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-foreground-0">{result.title}</span>
                            {subtitle && (
                              <span className="mt-1 block truncate text-xs text-foreground-3">{subtitle}</span>
                            )}
                          </span>
                          <span className="font-mono text-[0.625rem] text-foreground-3 uppercase">
                            {resultLabels[result.type]}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
          </div>

          <div className="hidden shrink-0 items-center gap-4 border-t border-border px-4 py-2 text-xs text-foreground-3 sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>Enter</Kbd>
              Open
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>Esc</Kbd>
              Close
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
