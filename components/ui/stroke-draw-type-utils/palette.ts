export type BjorkTone =
  | "violet"
  | "rose"
  | "mint"
  | "sky"
  | "amber"
  | "slate";

export const BJORK_PALETTE = {
  violet: {
    text: "#F5F3FF",
    accentInk: "#C4B5FD",
    fill: "#8B5CF6",
  },
  rose: {
    text: "#FFF1F2",
    accentInk: "#F9A8D4",
    fill: "#EC4899",
  },
  mint: {
    text: "#ECFDF5",
    accentInk: "#86EFAC",
    fill: "#10B981",
  },
  sky: {
    text: "#EFF6FF",
    accentInk: "#93C5FD",
    fill: "#3B82F6",
  },
  amber: {
    text: "#FFFBEB",
    accentInk: "#FCD34D",
    fill: "#F59E0B",
  },
  slate: {
    text: "#F8FAFC",
    accentInk: "#CBD5E1",
    fill: "#64748B",
  },
} satisfies Record<
  BjorkTone,
  {
    text: string;
    accentInk: string;
    fill: string;
  }
>;
