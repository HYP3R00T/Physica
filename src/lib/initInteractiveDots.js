const SELECTOR = '.dot-pattern-interactive'

const initialized = new WeakSet()

function setupDotPattern(el) {
  if (initialized.has(el)) return
  initialized.add(el)

  let currentX = el.clientWidth / 2
  let currentY = el.clientHeight / 2
  let targetX = currentX
  let targetY = currentY
  let rafId = 0

  el.style.setProperty('--dot-mx', `${currentX}px`)
  el.style.setProperty('--dot-my', `${currentY}px`)
  el.style.setProperty('--dot-highlight-opacity', '0')

  const animate = () => {
    currentX += (targetX - currentX) * 0.2
    currentY += (targetY - currentY) * 0.2

    el.style.setProperty('--dot-mx', `${currentX}px`)
    el.style.setProperty('--dot-my', `${currentY}px`)

    const isSettled = Math.abs(targetX - currentX) < 0.2 && Math.abs(targetY - currentY) < 0.2

    if (!isSettled) {
      rafId = window.requestAnimationFrame(animate)
      return
    }

    rafId = 0
  }

  const startAnimation = () => {
    if (rafId) return
    rafId = window.requestAnimationFrame(animate)
  }

  const updateTargetFromEvent = (event) => {
    const rect = el.getBoundingClientRect()
    targetX = event.clientX - rect.left
    targetY = event.clientY - rect.top
    el.style.setProperty('--dot-highlight-opacity', '1')
    startAnimation()
  }

  const hideHighlight = () => {
    el.style.setProperty('--dot-highlight-opacity', '0')
    if (!rafId) return
    window.cancelAnimationFrame(rafId)
    rafId = 0
  }

  el.addEventListener('pointerenter', updateTargetFromEvent)
  el.addEventListener('pointermove', updateTargetFromEvent)
  el.addEventListener('pointerleave', hideHighlight)
}

export default function initInteractiveDots() {
  document.querySelectorAll(SELECTOR).forEach(setupDotPattern)
  document.addEventListener('astro:after-swap', () => {
    document.querySelectorAll(SELECTOR).forEach(setupDotPattern)
  })
}
