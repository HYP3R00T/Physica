import placeholder1 from '@/assets/placeholder1.png'
import type { NavItem, SiteConfig } from '@/lib/types'

export const SITE: SiteConfig = {
  website: 'https://webdevtemplate.hyperoot.dev',
  author: 'Rajesh',
  repo: 'https://github.com/HYP3R00T/devcontainer-astro-template',
  title: 'Template',
  description: 'A starter template for Astro projects with mise, Biome, pre-commit hooks, and GitHub Actions.',
  image: placeholder1,
  imageAlt: 'Check out webdevtemplate.hyperoot.dev',
  contentType: 'Portfolio',
  twitterHandle: '@HYP3R00T',
  pageSize: 10,
  lang: 'en',
}

export const navItems: NavItem[] = [{ href: '/sample', label: 'Sample' }]
