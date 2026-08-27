/**
 * Hero copy. Each line holds segments so individual letters or glyphs can opt
 * into a different face:
 *   'swash'   -> oversized calligraphic capital (Great Vibes)
 *   'capital' -> oversized display-serif italic; decorative but unambiguously
 *                a capital, which the script face's ornate caps are not
 *   'pixel'   -> pixel font, used for the decorative glyphs
 *
 * Per line:
 *   scale        -> font size relative to the hero base size
 *   preserveCase -> opt out of the blanket uppercase (used for the name)
 */
export type SegmentVariant = "normal" | "swash" | "capital" | "pixel";

export interface Segment {
  text: string;
  variant?: SegmentVariant;
}

export interface HeroLine {
  segments: Segment[];
  scale?: number;
  preserveCase?: boolean;
}

export const heroLines: HeroLine[] = [
  {
    segments: [{ text: "O", variant: "swash" }, { text: "h good, another" }],
  },
  {
    segments: [
      // { text: "☀", variant: "pixel" },
      { text: "Portfolio" },
      // { text: "☀", variant: "pixel" },
    ],
  },
  {
    preserveCase: true,
    segments: [
      { text: "A", variant: "capital" },
      { text: "fthar " },
      { text: "N", variant: "capital" },
      { text: " N" },
    ],
  },
  {
    scale: 0.6,
    segments: [
      { text: "“" },
      { text: "I", variant: "swash" },
      { text: "t worked on localhost." },
    ],
  },
  {
    scale: 0.6,
    segments: [{ text: "Now building it for" }],
  },
  {
    scale: 0.6,
    segments: [
      { text: "the rest of the " },
      { text: "W", variant: "swash" },
      { text: "orld.”" },
    ],
  },
  // {
  //   segments: [
  //     { text: "K", variant: "swash" },
  //     { text: "erala" },
  //     { text: "©", variant: "pixel" },
  //     { text: "2026" },
  //     { text: "✦", variant: "pixel" },
  //   ],
  // },
];
