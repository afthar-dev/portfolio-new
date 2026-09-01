'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const BRUSH_RADIUS = 55;
/** Fraction of the surface that must be cleared before the overlay gives up. */
const REVEAL_THRESHOLD = 0.45;
/** Gold foil, banded slightly so it catches light like a real scratch panel. */
const FOIL_STOPS = ['#b8862b', '#e6c46a', '#c9a13c', '#f0d68c', '#b8862b'];

interface ScratchOverlayProps {
  /** Called once enough has been scratched away. */
  onRevealed: () => void;
  revealed: boolean;
}

export default function ScratchOverlay({
  onRevealed,
  revealed,
}: ScratchOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const touched = useRef(false);
  const [hintVisible, setHintVisible] = useState(true);

  // Paint the opaque layer, sized to the element rather than the window.
  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = 'source-over';
    // Diagonal sweep so the foil reads as metallic rather than flat paint.
    const foil = ctx.createLinearGradient(0, 0, width, height);
    FOIL_STOPS.forEach((stop, i) =>
      foil.addColorStop(i / (FOIL_STOPS.length - 1), stop)
    );
    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, width, height);
    // Every stroke from here erases instead of paints.
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  useEffect(() => {
    paint();
    window.addEventListener('resize', paint);
    return () => window.removeEventListener('resize', paint);
  }, [paint]);

  /** Samples a downscaled copy of the canvas to estimate how much is cleared. */
  const measureCleared = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return 0;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    // Every 64th pixel is plenty for a percentage and keeps this cheap.
    const step = 4 * 64;
    let total = 0;
    for (let i = 3; i < data.length; i += step) {
      total++;
      if (data[i] === 0) clear++;
    }
    return total ? clear / total : 0;
  }, []);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      const prev = last.current ?? { x: px, y: py };

      // Interpolate between frames so fast drags stay a continuous stroke.
      const dx = px - prev.x;
      const dy = py - prev.y;
      const steps = Math.max(Math.abs(dx), Math.abs(dy)) / 10;

      for (let i = 0; i <= steps; i++) {
        const t = steps === 0 ? 0 : i / steps;
        ctx.beginPath();
        ctx.arc(
          prev.x + dx * t,
          prev.y + dy * t,
          BRUSH_RADIUS,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      last.current = { x: px, y: py };

      if (!touched.current) {
        touched.current = true;
        setHintVisible(false);
      }
      if (measureCleared() > REVEAL_THRESHOLD) onRevealed();
    },
    [measureCleared, onRevealed]
  );

  return (
    <div
      // z-20 clears the CTA button, whose inner spans carry z-index: 2 and
      // would otherwise paint straight through the overlay.
      className={`absolute inset-0 z-20 transition-opacity duration-700 ${
        revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onMouseMove={(e) => scratch(e.clientX, e.clientY)}
        onMouseLeave={() => (last.current = null)}
        // Touch has no movementX/Y, so deltas come from the tracked point.
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) scratch(t.clientX, t.clientY);
        }}
        onTouchEnd={() => (last.current = null)}
        // No radius needed: the ticket's mask already clips this to shape.
        className="h-full w-full cursor-crosshair touch-none"
      />

      {hintVisible && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Ink on gold, with a light shadow so it stays legible across the
              lighter bands of the foil. */}
          <span className="animate-pulse font-heading text-sm uppercase tracking-[0.3em] text-ink/80 [text-shadow:0_1px_2px_rgba(255,255,255,0.35)] sm:text-base">
            Scratch to reveal
          </span>
        </span>
      )}
    </div>
  );
}
