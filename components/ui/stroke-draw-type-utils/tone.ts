import { useMemo } from "react";

import { BJORK_PALETTE, type BjorkTone } from "./palette";

export function useBjorkTone(tone?: BjorkTone): BjorkTone {
  return useMemo(() => tone ?? "violet", [tone]);
}

export const tonePalette = BJORK_PALETTE;
