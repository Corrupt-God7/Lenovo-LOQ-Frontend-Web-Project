'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface LenovoScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames?: number;
    imageFolderPath?: string;
}

export default function LenovoScrollCanvas({
    scrollYProgress,
    totalFrames = 240,
    imageFolderPath = '/images/loq-sequence/'
}: LenovoScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        // Create array of promises/loaders
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${imageFolderPath}${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    // Draw Frame function
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = images[index];
        if (!canvas || !img) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High DPI scaling
        const dpr = window.devicePixelRatio || 1;
        // We assume canvas size is set by CSS/Resize observer, but we need to set internal resolution
        // Actually, we'll set internal resolution in the resize handler, here we just draw.

        // Draw Logic (Object Fit: Contain)
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const scale = Math.min(cw / iw, ch / ih);
        const w = iw * scale;
        const h = ih * scale;
        const x = (cw - w) / 2;
        const y = (ch - h) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, x, y, w, h);
    };

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Re-draw current frame (approximate)
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(
                totalFrames - 1,
                Math.floor(currentProgress * (totalFrames - 1))
            );
            if (imagesLoaded) drawFrame(frameIndex);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded, scrollYProgress, totalFrames]); // Re-bind if loaded changes

    // Scroll Listener
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!imagesLoaded) return;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * (totalFrames - 1))
        );
        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Initial draw once loaded
    useEffect(() => {
        if (imagesLoaded) {
            const handleResize = () => { /* duplicated logic for safety, strictly init */
                const canvas = canvasRef.current;
                if (canvas) {
                    const dpr = window.devicePixelRatio || 1;
                    const rect = canvas.getBoundingClientRect();
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                }
            }
            handleResize();
            drawFrame(0);
        }
    }, [imagesLoaded]);

    return (
        <div className="relative w-full h-full bg-loq-black">
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-neon-cyan font-orbitron">
                    LOADING SYSTEM CORE...
                </div>
            )}
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
