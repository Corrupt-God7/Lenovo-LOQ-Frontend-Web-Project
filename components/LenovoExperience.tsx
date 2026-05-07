'use client';

import { MotionValue, motion, useTransform, AnimatePresence } from 'framer-motion';

interface LenovoExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function LenovoExperience({ scrollYProgress }: LenovoExperienceProps) {
    // --- PHASe 1: HERO (0 - 0.3) ---
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // --- PHASE 2: PERFORMANCE (0.35 - 0.65) ---
    const perfOpacity = useTransform(scrollYProgress, [0.30, 0.40, 0.60, 0.70], [0, 1, 1, 0]);
    const perfX = useTransform(scrollYProgress, [0.30, 0.40], [-100, 0]);

    // --- PHASE 3: THERMALS (0.7 - 1.0) ---
    const thermalsOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const thermalsX = useTransform(scrollYProgress, [0.65, 0.75], [100, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

            {/* --- HERO SECTION --- */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
            >
                <div className="border border-neon-cyan/30 p-12 bg-loq-black/20 backdrop-blur-sm relative">
                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />

                    <h1 className="text-6xl md:text-8xl font-orbitron font-black tracking-tighter text-white mb-2 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                        LENOVO <span className="text-neon-cyan">LOQ</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-rajdhani font-medium tracking-[0.5em] text-gray-300 uppercase">
                        Built for Extreme Performance
                    </p>

                    <div className="mt-8 relative inline-block">
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse" />
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-20 text-neon-cyan flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <span className="font-rajdhani text-sm tracking-widest">INITIATE SCROLL SEQUENCE</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
                </motion.div>
            </motion.div>

            {/* --- PERFORMANCE SECTION --- */}
            <motion.div
                style={{ opacity: perfOpacity, x: perfX }}
                className="absolute inset-0 flex items-center justify-start pl-10 md:pl-32 z-10"
            >
                <div className="max-w-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-electric-green" />
                        <h2 className="text-4xl md:text-6xl font-orbitron text-white">PERFORMANCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-green to-neon-cyan">CORE</span></h2>
                    </div>

                    <div className="space-y-6 font-rajdhani text-2xl text-gray-200">
                        <div className="bg-loq-black/60 border-l-4 border-electric-green p-4 backdrop-blur-md">
                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Processor</p>
                            <p className="text-3xl font-bold">Intel Core i5-12450HX</p>
                        </div>

                        <div className="bg-loq-black/60 border-l-4 border-neon-cyan p-4 backdrop-blur-md">
                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Graphics</p>
                            <p className="text-3xl font-bold">NVIDIA RTX 3050 <span className="text-lg font-normal text-gray-400">6GB GDDR6</span></p>
                        </div>

                        <div className="bg-loq-black/60 border-l-4 border-white p-4 backdrop-blur-md">
                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Memory</p>
                            <p className="text-3xl font-bold">16GB DDR5 <span className="text-lg font-normal text-gray-400">4800MHz</span></p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* --- THERMALS SECTION --- */}
            <motion.div
                style={{ opacity: thermalsOpacity, x: thermalsX }}
                className="absolute inset-0 flex items-center justify-end pr-10 md:pr-32 z-10"
            >
                <div className="max-w-xl text-right">
                    <div className="flex items-center gap-4 mb-4 justify-end">
                        <h2 className="text-4xl md:text-6xl font-orbitron text-white"><span className="text-neon-cyan">LIQUID</span> COOLING</h2>
                        <div className="w-12 h-[2px] bg-neon-cyan" />
                    </div>

                    <div className="space-y-8 font-rajdhani">
                        <div>
                            <h3 className="text-5xl font-bold text-white mb-2">ZERO THROTTLING</h3>
                            <p className="text-xl text-gray-400">Advanced thermal management system ensures sustained peak headers.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-white/10 p-4 bg-white/5">
                                <span className="block text-4xl font-bold text-electric-green">4x</span>
                                <span className="text-sm uppercase tracking-wider text-gray-400">Heat Pipes</span>
                            </div>
                            <div className="border border-white/10 p-4 bg-white/5">
                                <span className="block text-4xl font-bold text-electric-green">12V</span>
                                <span className="text-sm uppercase tracking-wider text-gray-400">Fan Power</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
