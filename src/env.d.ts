/// <reference types="astro/client" />

declare module "@fontsource-variable/inter"
declare module "@fontsource-variable/jetbrains-mono"
declare module "@fontsource-variable/space-grotesk"

declare namespace Astro {
  interface ClientDirectives {
    "client:search"?: boolean
  }
}
