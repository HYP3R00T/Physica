import setupImage from "@/assets/setup.jpg";

export const LOCALE = {
  lang: "en",
};

export const SITE = {
  website: "https://physica.hyperoot.dev",
  author: "Rajesh",
  repo: "https://github.com/HYP3R00T/Physica",
  title: "Physica",
  description:
    "Physica is a static Astro site that runs a real Rust physics engine in the browser via WebAssembly.",
  image: setupImage,
  imageAlt: "Check out physica.hyperoot.dev",
  contentType: "Physics Simulation",
  twitterHandle: "@HYP3R00T",
};

export const navItems = [
  // { href: "/post", label: "Blog" },
  { href: "https://hyperoot.dev", label: "Projects", blank: true },
];
