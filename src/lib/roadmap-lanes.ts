export const roadmapLanes = {
  mathematics: { label: "Mathematics", color: "var(--orange-0)" },
  mechanics: { label: "Mechanics", color: "var(--teal-0)" },
  waves: { label: "Waves & optics", color: "var(--cyan-0)" },
  electromagnetism: { label: "Electromagnetism", color: "var(--blue-0)" },
  thermal: { label: "Thermal physics", color: "var(--red-0)" },
  quantum: { label: "Quantum physics", color: "var(--purple-0)" },
  matter: { label: "Matter & particles", color: "var(--pink-0)" },
  space: { label: "Space & fields", color: "var(--green-0)" },
  methods: { label: "Methods", color: "var(--foreground-2)" },
} as const
export type RoadmapLane = keyof typeof roadmapLanes
