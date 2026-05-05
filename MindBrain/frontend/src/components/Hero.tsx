import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/it_product_laptop.webp';

/* ── Pure-CSS keyframes injected once ─────────────────────────────────────── */
const GLOBE_KEYFRAMES = `
@keyframes globeSpin {
  from { background-position-x: 0px; }
  to   { background-position-x: -480px; }
}
@keyframes floatY {
  0%,100% { transform: translate(-50%, -50%) translateY(-8px); }
  50%      { transform: translate(-50%, -50%) translateY(8px); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
`;

/* ── OrbitRing: pure-CSS rotation for buttery smoothness ──────────────────── */
const OrbitRing = ({
  label,
  duration,
  radius,
  reverse = false,
  startAngle = 0,
  className = '',
}: {
  label: string;
  duration: number;
  radius: number;
  reverse?: boolean;
  startAngle?: number;
  className?: string;
}) => {
  const spinStyle: React.CSSProperties = {
    animation: `spin ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  const counterStyle: React.CSSProperties = {
    animation: `spin ${duration}s linear infinite${reverse ? '' : ' reverse'}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: `rotate(${-startAngle}deg)`,
  };

  return (
    <div
      className={`absolute top-1/2 left-1/2 rounded-full border border-white/[0.08] ${className}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        marginTop: -radius,
        marginLeft: -radius,
        transform: `rotate(${startAngle}deg)`,
      }}
    >
      <div style={spinStyle}>
        {/* Node at top-centre of ring */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="group flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.35 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div style={counterStyle}>
              <div className="w-3 h-3 bg-white/80 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.7)] group-hover:bg-white group-hover:shadow-[0_0_28px_rgba(255,255,255,1)] transition-all duration-300" />
              <span className="mt-2 text-[11px] text-[#bbb] font-medium tracking-widest opacity-75 group-hover:opacity-100 group-hover:text-white transition-all duration-300 whitespace-nowrap uppercase">
                {label}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ── Hero ─────────────────────────────────────────────────────────────────── */
const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center justify-center border-b border-gray-800">
      {/* Full-width Background Image with Soft Dark Overlay */}
      <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed grayscale"
          style={{ backgroundImage: `url(${bgImage})` }}
      >
          <div className="absolute inset-0 bg-black/85"></div>
      </div>

      {/* Injected keyframes */}
      <style>{GLOBE_KEYFRAMES}</style>

      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Main layout */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-[80px] relative z-10 flex flex-col lg:flex-row items-center justify-between mt-[60px] lg:mt-0 gap-y-16 lg:gap-y-0">

        {/* ── Left Content ── */}
        <div className="w-full lg:w-[45%] flex flex-col items-start z-20">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              MindBrain Innovations
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[40px] sm:text-[50px] lg:text-[62px] font-bold text-white leading-[1.12] tracking-tight font-['Inter','Poppins',sans-serif]"
          >
            Empower Talent,{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Transform Futures
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[460px] text-[16px] md:text-[17px] leading-[1.75] text-white/50 font-['Inter',sans-serif]"
          >
            Delivering expert training, seamless placements, and innovative IT product solutions for a smarter, connected world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-4 flex-wrap"
          >
            <motion.a
              href="/#training"
              whileHover={{ scale: 1.06, backgroundColor: '#e8e8e8' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0f0f0f] shadow-[0_0_24px_rgba(255,255,255,0.18)] cursor-pointer"
            >
              Get Started
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="rounded-full border border-white/25 bg-transparent px-8 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm"
            >
              <a href="/services">Explore</a>
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right: Globe + Orbits ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[50%] h-[420px] lg:h-[600px] relative flex items-center justify-center"
        >
          {/*
            Single wrapper that floats via CSS animation so there are
            zero re-renders — the globe stays perfectly centred inside orbits.
          */}
          <div
            className="absolute w-0 h-0"
            style={{ top: '50%', left: '50%', animation: 'floatY 7s ease-in-out infinite' }}
          >
            {/* Orbit rings */}
            <OrbitRing label="Web Solution"   duration={18} radius={110} />
            <OrbitRing label="AI/ML Solution" duration={26} radius={155} />
            <OrbitRing label="Manpower Outsourcing" duration={22} radius={200} />
            <OrbitRing className="hidden sm:block" label="Trending Technologies" duration={30} radius={245} />
            <OrbitRing className="hidden lg:block" label="IoT Solutions"  duration={35} radius={290} />

            {/* Earth Globe — centred at (0,0) via top/left offset */}
            <div
              className="absolute rounded-full overflow-hidden border border-white/15"
              style={{
                width: 130,
                height: 130,
                top: -65,
                left: -65,
                boxShadow: '0 0 60px rgba(255,255,255,0.18), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Scrolling earth texture — GPU-accelerated CSS animation */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: "url('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')",
                  backgroundSize: 'auto 100%',
                  backgroundRepeat: 'repeat-x',
                  filter: 'grayscale(100%) contrast(1.15) brightness(1.55)',
                  animation: 'globeSpin 30s linear infinite',
                  willChange: 'background-position',
                }}
              />
              {/* Sphere depth shading */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: 'inset -16px -10px 28px rgba(0,0,0,0.85), inset 6px 6px 18px rgba(255,255,255,0.35)',
                  mixBlendMode: 'hard-light',
                }}
              />
              {/* Thin atmosphere rim */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: '0 0 20px 4px rgba(255,255,255,0.08)',
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;