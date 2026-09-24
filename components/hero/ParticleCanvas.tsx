"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number };

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationId = 0;
    let burst = false;
    let burstTimer = 0;

    const mouse = { x: 0, y: 0, active: false };

    const COLOR_DOT = "#FF4FA3";
    const COLOR_LINE = "183, 148, 246";
    const COLOR_MOUSE = "255, 79, 163";
    const CONNECT_DISTANCE = 130;
    const MOUSE_RADIUS = 160;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const count = Math.min(90, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const draw = (schedule = true) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dxm = mouse.x - p.x;
          const dym = mouse.y - p.y;
          const distM = Math.hypot(dxm, dym);
          if (distM < MOUSE_RADIUS && distM > 0) {
            const pull = (1 - distM / MOUSE_RADIUS) * 0.6;
            p.x += (dxm / distM) * pull;
            p.y += (dym / distM) * pull;

            const o = (1 - distM / MOUSE_RADIUS) * 0.6;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${COLOR_MOUSE}, ${o})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = burst ? `hsl(${(performance.now() / 5) % 360} 90% 65%)` : COLOR_DOT;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${COLOR_LINE}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (schedule) animationId = requestAnimationFrame(() => draw());
    };

    const handleResize = () => {
      resize();
      createParticles();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };
        const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];
    let konamiIdx = 0;

    const triggerBurst = () => {
      burst = true;
      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        p.vx = (dx / d) * (4 + Math.random() * 3);
        p.vy = (dy / d) * (4 + Math.random() * 3);
      }
      clearTimeout(burstTimer);
      burstTimer = window.setTimeout(() => {
        burst = false;
        for (const p of particles) {
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = (Math.random() - 0.5) * 0.4;
        }
      }, 1800);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          triggerBurst();
        }
      } else {
        konamiIdx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    createParticles();

    if (reduced) {
      draw(false);
      return;
    }

    draw();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      clearTimeout(burstTimer);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}