import { useCallback, useEffect, useRef } from "react";

export interface UseVisibleLoopOptions {
  enabled?: boolean;
  threshold?: number;
}

export function useVisibleLoop<T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  frame: (deltaSeconds: number) => boolean,
  options: UseVisibleLoopOptions = {},
) {
  const { enabled = true, threshold = 0.2 } = options;
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const visibleRef = useRef(false);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastRef.current = null;
  }, []);

  const loop = useCallback(
    (time: number) => {
      if (!visibleRef.current) return;

      const previous = lastRef.current ?? time;
      const delta = (time - previous) / 1000;
      lastRef.current = time;
      const keepRunning = frame(delta);

      if (keepRunning) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        stop();
      }
    },
    [frame, stop],
  );

  const wake = useCallback(() => {
    if (!enabled || !ref.current) return;
    if (visibleRef.current && rafRef.current !== null) return;
    visibleRef.current = true;
    lastRef.current = null;
    rafRef.current = requestAnimationFrame(loop);
  }, [enabled, loop, ref]);

  useEffect(() => {
    if (!enabled || !ref.current) {
      stop();
      visibleRef.current = false;
      return;
    }

    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const isVisible = entry.isIntersecting;
        visibleRef.current = isVisible;

        if (isVisible) {
          wake();
        } else {
          stop();
        }
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      stop();
      visibleRef.current = false;
    };
  }, [enabled, ref, stop, threshold, wake]);

  return { wake, stop };
}
