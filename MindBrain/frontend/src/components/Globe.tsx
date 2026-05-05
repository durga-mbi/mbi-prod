import React from "react";

const Globe: React.FC = () => {
  return (
    <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-[inset_-40px_-60px_120px_rgba(0,0,0,0.6)] animate-[spin_40s_linear_infinite] mx-auto overflow-hidden">
      {/* Light reflection */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.25)_0%,transparent_45%)] z-10 pointer-events-none" />

      {/* DARK EDGE SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,transparent_55%,rgba(0,0,0,0.55)_100%)] z-10 pointer-events-none" />

      {/* Dotted World Map (clean grid, not noise) */}
      <div className="absolute inset-6 opacity-50 mix-blend-screen pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
          {Array.from({ length: 36 }).map((_, row) =>
            Array.from({ length: 72 }).map((_, col) => {
              const x = col * 14;
              const y = row * 14;

              /* continent shaping function */
              const cx = x - 500;
              const cy = y - 250;
              const ellipse1 =
                (cx * cx) / (360 * 360) + (cy * cy) / (180 * 180);
              const ellipse2 =
                (cx + 240) ** 2 / (150 * 150) + (cy - 40) ** 2 / (120 * 120);
              const ellipse3 =
                (cx - 260) ** 2 / (170 * 170) + (cy + 60) ** 2 / (140 * 140);

              if (ellipse1 < 1.05 && ellipse2 > 1 && ellipse3 > 1) {
                return (
                  <circle
                    key={`${row}-${col}`}
                    cx={x}
                    cy={y}
                    r="2"
                    className="opacity-90"
                  />
                );
              }
              return null;
            }),
          )}
        </svg>
      </div>

      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border border-white/10 z-20 shadow-[0_0_40px_rgba(255,255,255,0.15)]" />
    </div>
  );
};

export default Globe;
