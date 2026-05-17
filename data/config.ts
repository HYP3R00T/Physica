import placeholder1 from '@/assets/placeholder1.png'
import type { NavItem, SiteConfig } from '@/lib/types'

export const SITE: SiteConfig = {
  website: 'https://physica.hyperoot.dev',
  author: 'Rajesh',
  repo: 'https://github.com/HYP3R00T/Physica',
  title: 'Physica',
  description: '',
  image: placeholder1,
  imageAlt: 'Check out physica.hyperoot.dev',
  contentType: 'Portfolio',
  twitterHandle: '@HYP3R00T',
  pageSize: 10,
  lang: 'en',
}

export const navItems: NavItem[] = [{ href: '/sample', label: 'Sample' }]
