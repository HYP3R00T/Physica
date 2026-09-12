export type SearchItemType = "article" | "module" | "note" | "heading"

export interface SearchItem {
  id: string
  type: SearchItemType
  url: string
  title: string
  moduleTitle: string
  parentTitle?: string
  description?: string
  depth?: number
  tags: string[]
  body: string
}

export interface SearchIndex {
  items: SearchItem[]
}
