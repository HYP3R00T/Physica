import type { CollectionEntry } from "astro:content"
import type { ImageMetadata, MarkdownHeading } from "astro"

export type SEOImage = string | ImageMetadata

export interface HeadSEOProps {
  title?: string
  description?: string
  image?: SEOImage
  imageAlt?: string
  contentType?: "website" | "article"
  noIndex?: boolean
}

export interface BaseLayoutProps extends HeadSEOProps {
  layout?: "default" | "focused" | "notes"
}

export interface SiteConfig {
  website?: string
  pageSize?: number
  repo: string
  title: string
  description: string
  image: SEOImage
  imageAlt: string
  contentType: "website" | "article"
  twitterHandle: string
  author: string
  lang: string
}

export interface NavItem {
  href: string
  label: string
  special?: boolean
  blank?: boolean
}

export interface SocialLink {
  name: string
  href: string
  active: boolean
  linkTitle?: string
}

// Posts / content types
export type PostEntry = CollectionEntry<"posts">
export type Posts = PostEntry[]

export interface PostsPageProps {
  page: {
    data: PostEntry[]
    currentPage: number
    pageSize: number
    url: {
      first?: string
      prev?: string
      next?: string
      last?: string
    }
  }
  totalPages?: number
  featured?: PostEntry
}

export interface PostPath {
  params: { slug: string }
  props: { entry: PostEntry; headings: MarkdownHeading[] }
}

export interface PostDetailPageProps {
  entry: PostEntry
  headings: MarkdownHeading[]
}

export interface PostCardProps {
  post: PostEntry
}
