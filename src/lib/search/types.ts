export type SearchItemType = "article" | "module" | "note" | "roadmap"

export interface SearchItem {
  id: string
  type: SearchItemType
  url: string
  title: string
  moduleTitle: string
  description?: string
  tags: string[]
  body: string
}

export interface SearchIndex {
  items: SearchItem[]
}
