import type { ImageMetadata } from 'astro'

// For HeadSEO.astro
export interface HeadSEOProps {
  title: string
  description: string
  image: string | ImageMetadata
  imageAlt: string
  contentType: string
  noIndex?: boolean
}

// For src/layouts/BaseLayout.astro
// Accepts any subset of SEO props; HeadSEO provides sensible defaults.
export interface BaseLayoutProps extends Partial<HeadSEOProps> {}

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

// Footer navigation item
export interface FooterNavItem {
  href: string
  label: string
  blank?: boolean
}

// Social media link configuration
export interface SocialObjects {
  name: string
  href: string
  active: boolean
  linkTitle?: string
}

// Footer social link configuration
export interface FooterSocialLink {
  name: string
  href: string
  label: string
  linkTitle: string
}
