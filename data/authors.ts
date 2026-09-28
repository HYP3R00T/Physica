interface Author {
  name: string
  role?: string
  profile?: {
    bio: string
    links?: { label: string; href: string }[]
  }
}

export const AUTHORS = {
  rajesh: {
    name: "Rajesh Das",
    role: "Maintainer",
    profile: {
      bio: "I started Physica to work through physics from the basics and make that learning useful to others.",
      links: [
        { label: "Website", href: "https://rajeshdas.dev" },
        { label: "GitHub", href: "https://github.com/HYP3R00T" },
        { label: "LinkedIn", href: "https://linkedin.com/in/rajesh-kumar-das" },
      ],
    },
  },
} as const satisfies Record<string, Author>

export type AuthorId = keyof typeof AUTHORS

export const authorIds = Object.keys(AUTHORS) as AuthorId[]

export function isAuthorId(id: string): id is AuthorId {
  return Object.hasOwn(AUTHORS, id)
}

export function getAuthor(id: AuthorId): Author & { id: AuthorId } {
  return { id, ...AUTHORS[id] }
}

export function hasAuthorProfile(id: AuthorId) {
  return Boolean(getAuthor(id).profile)
}
