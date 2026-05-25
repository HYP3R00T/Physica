import type { ElementType, Ref } from 'react'
import { useEffect, useRef } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'

interface Props {
  text?: string
  auto?: boolean
  hover?: boolean
  tag?: keyof HTMLElementTagNameMap | string
  className?: string
}

export default function AnimatedText({ text = '', auto = false, hover = true, tag = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const current = ref.current
    if (!current) return
    const node: HTMLElement = current

    const target = text || node.textContent || ''
    node.dataset.value = target
    node.textContent = target

    let interval: ReturnType<typeof setInterval> | null = null

    function playAnimation() {
      if (interval !== null) {
        clearInterval(interval)
      }

      let iteration = 0
      interval = setInterval(() => {
        node.textContent = (node.textContent || '')
          .split('')
          .map((_, i) => (i < iteration ? target[i] : LETTERS[Math.floor(Math.random() * LETTERS.length)]))
          .join('')

        if (iteration >= target.length && interval !== null) {
          clearInterval(interval)
          interval = null
        }

        iteration += 1 / 3
      }, 30)
    }

    if (auto) playAnimation()

    if (hover) node.addEventListener('mouseover', playAnimation)

    return () => {
      if (interval !== null) clearInterval(interval)
      if (hover) node.removeEventListener('mouseover', playAnimation)
    }
  }, [text, auto, hover])

  const Tag = tag as ElementType
  return (
    <Tag
      ref={ref as unknown as Ref<HTMLElement>}
      data-animated-text
      data-value={text}
      data-auto={String(auto)}
      data-hover={String(hover)}
      className={className}
    >
      {text}
    </Tag>
  )
}
