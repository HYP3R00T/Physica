// For HeadSEO.astro
export interface HeadSEOProps {
  title: string
  description: string
  image: string | ImageMetadata
  imageAlt: string
  contentType: string
  noIndex?: boolean
}

// Site-level configuration
export interface SiteConfig {
  website: string
  author: string
  repo: string
  title: string
  description: string
  image: string | ImageMetadata
  imageAlt?: string
  contentType: string
  twitterHandle?: string
  pageSize?: number
  lang: string
}

// Navigation item in the header navigation
export interface NavItem {
  href: string
  label: string
  special?: boolean
  blank?: boolean
}

// For src/layouts/BaseLayout.astro
// Accepts any subset of SEO props; HeadSEO provides sensible defaults.
export interface BaseLayoutProps extends Partial<HeadSEOProps> {}
