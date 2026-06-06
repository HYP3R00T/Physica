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

export const navItems: NavItem[] = [
  { href: '/components', label: 'Components' },
  { href: '/post', label: 'Articles' },
]

export const SOCIAL_LINKS = [
  {
    name: 'github',
    href: 'https://github.com/HYP3R00T',
    active: true,
    linkTitle: 'Visit my GitHub profile',
  },
  {
    name: 'linkedin',
    href: 'https://linkedin.com/in/rajesh-kumar-das',
    active: true,
    linkTitle: 'Connect with me on LinkedIn',
  },
  {
    name: 'mail',
    href: 'mailto:hello@rajeshdas.dev',
    active: true,
    linkTitle: 'Send me an email',
  },
]
