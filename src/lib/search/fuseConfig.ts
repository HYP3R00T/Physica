import type { IFuseOptions } from "fuse.js"

import type { SearchItem } from "@/lib/search/types"

export const fuseOptions: IFuseOptions<SearchItem> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "parentTitle", weight: 0.2 },
    { name: "moduleTitle", weight: 0.15 },
    { name: "tags", weight: 0.1 },
    { name: "description", weight: 0.1 },
    { name: "body", weight: 0.05 },
  ],
  useTokenSearch: true,
  includeMatches: true,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
  threshold: 0.35,
}
