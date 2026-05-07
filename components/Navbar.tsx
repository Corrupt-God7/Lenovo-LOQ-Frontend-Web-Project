'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 transition-colors duration-300 ${isScrolled ? 'bg-loq-black/80 backdrop-blur-md border-b border-neon-cyan/20' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-neon-cyan shadow-[0_0_10px_#00ffff]" />
                <span className="text-2xl font-bold font-orbitron tracking-widest text-white uppercase">
                    Lenovo <span className="text-neon-cyan">LOQ</span>
                </span>
            </div>

            {/* Action */}
            <button className="relative group px-6 py-2 overflow-hidden border border-neon-cyan/50 hover:border-neon-cyan transition-all duration-300">
                <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-rajdhani font-semibold tracking-wider text-sm uppercase">
                    Configure
                </span>
                {/* Tech decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        </motion.nav>
    );
}
