import placeholder from "@/assets/placeholder.png"
import type { NavItem, SiteConfig } from "@/lib/types"

export const SITE: SiteConfig = {
  website: "https://physica.hyperoot.dev",
  author: "Rajesh Das",
  repo: "https://github.com/HYP3R00T/Physica",
  title: "Physica",
  description: "Physics notes, derivations, and articles that connect intuition with equations and practice.",
  image: placeholder,
  imageAlt: "Check out physica.hyperoot.dev",
  contentType: "website",
  twitterHandle: "@HYP3R00T",
  pageSize: 10,
  lang: "en",
}

export const navItems: NavItem[] = [{ href: "/post", label: "Blog" }]

export const SOCIAL_LINKS = [
  {
    name: "github",
    href: "https://github.com/HYP3R00T",
    active: true,
    linkTitle: "Visit my GitHub profile",
  },
  {
    name: "linkedin",
    href: "https://linkedin.com/in/rajesh-kumar-das",
    active: true,
    linkTitle: "Connect with me on LinkedIn",
  },
  {
    name: "mail",
    href: "mailto:hello@rajeshdas.dev",
    active: true,
    linkTitle: "Send me an email",
  },
]
