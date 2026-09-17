import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
  caption?: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Poster-style aspect ratio for the frame. Every pair ships as 4:3. */
  aspectRatio?: string;
  className?: string;
}

const REST_POSITION = 50;
const SWEEP_FROM = 36;
const SWEEP_TO = 64;
const SWEEP_PERIOD_MS = 5200;

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BeforeAfterSlider({
  before,
  after,
  alt,
  caption,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "4 / 3",
  className = "",
}: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(REST_POSITION);
  const [dragging, setDragging] = useState(false);
  // Once somebody moves the handle themselves the automatic sweep stops for good.
  const [taken, setTaken] = useState(false);
  const [visible, setVisible] = useState(false);

  // Same pointer -> percentage math the video scrubber uses in
  // ServiceVideoExperience.tsx, clamped so the handle cannot leave the frame.
  const positionFromPointer = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return REST_POSITION;
    const rect = frame.getBoundingClientRect();
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, percentage));
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setTaken(true);
    setDragging(true);
    setPosition(positionFromPointer(event.clientX));
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPosition(positionFromPointer(event.clientX));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setTaken(true);
      setPosition((current) => Math.max(0, current - step));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setTaken(true);
      setPosition((current) => Math.min(100, current + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setTaken(true);
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setTaken(true);
      setPosition(100);
    }
  };

  // Only sweep while the comparison is actually on screen — no point animating
  // a frame nobody is looking at.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (taken || dragging || !visible || prefersReducedMotion()) return;

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const phase = ((now - start) % SWEEP_PERIOD_MS) / SWEEP_PERIOD_MS;
      // A cosine gives an ease-in-out wipe that rests briefly at each end.
      const eased = (1 - Math.cos(phase * 2 * Math.PI)) / 2;
      setPosition(SWEEP_FROM + (SWEEP_TO - SWEEP_FROM) * eased);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [taken, dragging, visible]);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        ref={frameRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative w-full overflow-hidden rounded-xl bg-[#0A0A0A] touch-none select-none cursor-ew-resize"
        style={{ aspectRatio }}
      >
        <img
          src={after}
          alt={`${alt} — ${afterLabel.toLowerCase()}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* The "before" frame sits on top and is revealed from the left edge.
            Both files share one crop box, so the two views stay registered. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${alt} — ${beforeLabel.toLowerCase()}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#0A0A0A]/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#C4973E]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] backdrop-blur-sm">
          {afterLabel}
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label={`${alt}: drag to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% ${beforeLabel.toLowerCase()}`}
          onKeyDown={handleKeyDown}
          className="absolute inset-y-0 z-10 w-12 -translate-x-1/2 cursor-ew-resize outline-none"
          style={{ left: `${position}%` }}
        >
          <span className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[#C4973E] shadow-[0_0_18px_rgba(196,151,62,0.55)]" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C4973E] bg-[#0A0A0A]/85 text-[#C4973E] shadow-lg backdrop-blur-sm">
            <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-sm text-white/55" style={{ fontFamily: "Inter, sans-serif" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
