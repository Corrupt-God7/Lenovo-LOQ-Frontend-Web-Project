'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import LenovoScrollCanvas from '@/components/LenovoScrollCanvas';
import LenovoExperience from '@/components/LenovoExperience';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the 600vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-loq-black min-h-screen">
      <Navbar />

      {/* --- SCROLL SEQUENCER SECTION --- */}
      <div ref={containerRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 1. The Image Sequence Background */}
          <LenovoScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
          />

          {/* 2. The HUD Overlay */}
          <LenovoExperience
            scrollYProgress={scrollYProgress}
          />

          {/* Optional: Vignette / Overlay for aesthetics */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-loq-black/20 via-transparent to-loq-black/80" />
        </div>
      </div>

      {/* --- POST-SEQUENCE CONTENT --- */}
      <section className="relative z-10 bg-loq-black py-32 px-6 md:px-20 border-t border-neon-cyan/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-orbitron mb-16 text-center">
            TECHNICAL <span className="text-neon-cyan">SPECIFICATIONS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Processor", val: "i5-12450HX", sub: "12th Gen Intel Core" },
              { label: "GPU", val: "RTX 3050", sub: "NVIDIA GeForce" },
              { label: "RAM", val: "16GB", sub: "DDR5-4800" },
              { label: "Display", val: "144Hz", sub: "FHD IPS / G-SYNC" },
            ].map((spec, i) => (
              <div key={i} className="group border border-white/10 p-8 hover:border-neon-cyan/50 hover:bg-white/5 transition-all duration-300">
                <h3 className="text-sm font-rajdhani text-gray-400 uppercase tracking-widest mb-2">{spec.label}</h3>
                <p className="text-3xl font-orbitron font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">{spec.val}</p>
                <p className="text-sm text-gray-500">{spec.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <button className="bg-neon-cyan text-loq-black font-bold font-rajdhani text-xl px-12 py-4 uppercase tracking-widest hover:bg-white transition-colors">
              Build Your Weapon
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 text-center text-gray-600 font-rajdhani text-sm border-t border-white/5">
        <p>&copy; 2026 Lenovo LOQ Showcase Concept. Not an official site.</p>
      </footer>
    </main>
  );
}
