export type FilterId =
  | "clear"
  | "noir"
  | "honey"
  | "ice"
  | "faded"
  | "pop"
  | "soft"
  | "paper";

export type FilterPreset = {
  id: FilterId;
  label: string;
  hint: string;
  css: string;
  vignette: number;
};

export const FILTERS: FilterPreset[] = [
  { id: "clear", label: "Clear", hint: "True color", css: "none", vignette: 0 },
  {
    id: "noir",
    label: "Noir",
    hint: "High-contrast mono",
    css: "grayscale(1) contrast(1.22) brightness(0.92)",
    vignette: 0.5,
  },
  {
    id: "honey",
    label: "Honey",
    hint: "Warm tungsten",
    css: "sepia(0.28) saturate(1.18) hue-rotate(-12deg) brightness(1.06)",
    vignette: 0.16,
  },
  {
    id: "ice",
    label: "Ice",
    hint: "Cool daylight",
    css: "saturate(0.78) hue-rotate(16deg) contrast(1.08) brightness(1.04)",
    vignette: 0.12,
  },
  {
    id: "faded",
    label: "Faded",
    hint: "Sun-bleached print",
    css: "sepia(0.38) contrast(0.88) brightness(1.08) saturate(0.72)",
    vignette: 0.38,
  },
  {
    id: "pop",
    label: "Pop",
    hint: "Punchy color",
    css: "saturate(1.42) contrast(1.14) brightness(1.04)",
    vignette: 0,
  },
  {
    id: "soft",
    label: "Soft",
    hint: "Diffused glow",
    css: "brightness(1.1) contrast(0.86) saturate(0.88)",
    vignette: 0.22,
  },
  {
    id: "paper",
    label: "Paper",
    hint: "Newsprint",
    css: "grayscale(0.88) contrast(1.1) brightness(1.12)",
    vignette: 0.28,
  },
];

export function getFilter(id: FilterId): FilterPreset {
  return FILTERS.find((filter) => filter.id === id) ?? FILTERS[0];
}
