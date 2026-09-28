import { ArrowRight, ArrowUpRight, Globe2 } from "lucide-react"
import githubIconUrl from "@/assets/icons/github.svg?url"
import linkedinIconUrl from "@/assets/icons/linkedin.svg?url"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { type AuthorId, getAuthor, hasAuthorProfile } from "../../../data/authors"

interface Props {
  id: AuthorId
}

export default function AuthorPreview({ id }: Props) {
  const author = getAuthor(id)
  const profile = hasAuthorProfile(id) ? author.profile : undefined

  return (
    <HoverCard openDelay={180} closeDelay={200}>
      <HoverCardTrigger asChild>
        {profile ? (
          <a
            href={`/author/${id}`}
            className="text-foreground-2 underline-offset-2 hover:text-accent-1 hover:underline focus-visible:text-accent-1 focus-visible:underline"
          >
            {author.name}
          </a>
        ) : (
          <button
            type="button"
            className="cursor-help text-foreground-2 underline-offset-2 hover:text-accent-1 hover:underline focus-visible:text-accent-1 focus-visible:underline"
          >
            {author.name}
          </button>
        )}
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background-1 font-display text-sm font-semibold text-accent-1"
          >
            {author.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <p className="font-display text-base font-semibold text-foreground-0">{author.name}</p>
            <p className="mt-0.5 text-xs text-foreground-3">{author.role ?? "Physica contributor"}</p>
          </div>
        </div>
        {profile?.bio && <p className="mt-4 text-sm leading-6 text-foreground-2">{profile.bio}</p>}
        {profile?.links && profile.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-3 text-xs">
            {profile.links.map((link) => {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-1 hover:text-accent-2 hover:underline"
                >
                  {link.icon === "globe" ? (
                    <Globe2 className="size-3.5" aria-hidden="true" />
                  ) : (
                    <img
                      src={link.icon === "github" ? githubIconUrl : linkedinIconUrl}
                      className="size-3.5 dark:invert"
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                  {link.label}
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        )}
        {profile && (
          <a
            href={`/author/${id}`}
            className="mt-4 inline-block text-xs text-foreground-2 hover:text-accent-1 hover:underline"
          >
            <span className="inline-flex items-center gap-1.5">
              View author page <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </a>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
