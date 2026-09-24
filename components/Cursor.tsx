"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = { id: number; x: number; y: number };

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let animationId = 0;
    let rippleId = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      setHovering(!!el?.closest("a, button, [role='button']"));
    };

    const onDown = (e: PointerEvent) => {
      const id = rippleId++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    const render = () => {
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;
      const ringEl = ringRef.current;
      if (ringEl) {
        ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  const removeRipple = (id: number) =>
    setRipples((prev) => prev.filter((r) => r.id !== id));

  return (
    <>
      {ripples.map((r) => (
        <div
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-99"
          style={{ transform: `translate(${r.x}px, ${r.y}px)` }}
        >
          <span className="cursor-ripple absolute h-20 w-20 rounded-full border border-accent" />
          <span
            onAnimationEnd={() => removeRipple(r.id)}
            className="cursor-ripple cursor-ripple-delay absolute h-20 w-20 rounded-full border border-lavender"
          />
        </div>
      ))}

      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-100 rounded-full border border-accent shadow-[0_0_12px_rgba(255,79,163,0.35)] transition-[width,height,background-color] duration-200 ${
          hovering ? "h-12 w-12 bg-accent/10" : "h-8 w-8"
        }`}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(255,79,163,0.7)]"
      />
    </>
  );
}