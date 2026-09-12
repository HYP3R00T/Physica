import type { APIRoute } from "astro"

import { buildSearchIndex } from "@/lib/search/buildSearchIndex"

export const prerender = true

export const GET: APIRoute = async () => {
  const index = await buildSearchIndex()

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
