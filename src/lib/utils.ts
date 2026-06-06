import type { CollectionEntry } from 'astro:content'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Posts } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const postFilter = ({ data }: CollectionEntry<'posts'>) => {
  const isPublishTimePassed = Date.now() > new Date(data.pubDatetime).getTime()
  return !data.draft && isPublishTimePassed
}

export const getSortedPosts = (posts: Posts) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.pubDatetime).getTime() / 1000) -
        Math.floor(new Date(a.data.pubDatetime).getTime() / 1000),
    )
}

export function formatDate(dateString: string | Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions) {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short', // "May"
    day: 'numeric', // 21
    ...options,
  })
}

export function formatDateUppercase(date: Date): string {
  return date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase()
}

export function formatMonthYear(date: Date, locale = 'en-US'): string {
  return date.toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  })
}

export function formatMonthYearRange(startDate?: Date, endDate?: Date, locale = 'en-US'): string | null {
  if (!startDate && !endDate) {
    return null
  }

  const startText = startDate ? formatMonthYear(startDate, locale) : null
  const endText = endDate ? formatMonthYear(endDate, locale) : null

  if (startText && endText) {
    return `${startText} - ${endText}`
  }

  if (startText && !endText) {
    return `${startText} - Present`
  }

  return endText
}
export function estimateReadTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
