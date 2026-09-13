import type { ClientDirective } from "astro"

const search: ClientDirective = (load, _options, element) => {
  const controller = new AbortController()
  let loading = false
  const trigger = element.querySelector("button")
  const modifier = element.querySelector("kbd[data-slot=kbd]")
  const originalLabel = trigger?.getAttribute("aria-label") ?? ""
  const originalModifier = modifier?.textContent ?? ""
  const restoreLabel = () => {
    trigger?.setAttribute("aria-label", originalLabel)
    trigger?.setAttribute("title", originalLabel)
    if (modifier) modifier.textContent = originalModifier
  }
  if (/Mac|iPhone|iPad/.test(navigator.platform)) {
    trigger?.setAttribute("aria-label", "Search Physica (⌘+K)")
    trigger?.setAttribute("title", "Search Physica (⌘+K)")
    if (modifier) modifier.textContent = "⌘"
  }
  const activate = async (event: Event) => {
    if (element.ownerDocument !== document) return
    if (event instanceof KeyboardEvent && !(event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey))) return
    event.preventDefault()
    if (loading) return
    loading = true
    element.setAttribute("data-search-requested", "")
    element.setAttribute("aria-busy", "true")
    try {
      const hydrate = await load()
      if (!element.isConnected) return
      // Match the server markup before React takes ownership of the trigger.
      restoreLabel()
      await hydrate()
      controller.abort()
    } catch (error) {
      loading = false
      console.error("Unable to load search", error)
    } finally {
      element.removeAttribute("aria-busy")
    }
  }
  element.addEventListener("click", activate, { signal: controller.signal })
  document.addEventListener("keydown", activate, { signal: controller.signal })
  document.addEventListener(
    "astro:before-swap",
    () => {
      // The router may prepare the next island in a detached document before swapping.
      if (element.ownerDocument === document) controller.abort()
    },
    { signal: controller.signal },
  )
}
export default search
