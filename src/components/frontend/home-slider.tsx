"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Slider, Locale } from "@/lib/types";
import { useLocale } from "next-intl";

interface HomeSliderProps {
    sliders: Slider[];
}

export function HomeSlider({ sliders }: HomeSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const locale = useLocale() as Locale;

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, [sliders.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + sliders.length) % sliders.length);
    }, [sliders.length]);

    useEffect(() => {
        if (sliders.length <= 1) return;
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide, sliders.length]);

    if (!sliders || sliders.length === 0) return null;

    const variants = {
        enter: {
            opacity: 0,
        },
        center: {
            zIndex: 1,
            opacity: 1,
        },
        exit: {
            zIndex: 0,
            opacity: 0,
        },
    };

    const currentSlider = sliders[currentIndex];

    return (
        <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
            {/* Animated Background Images */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 0.8, ease: "easeInOut" },
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={currentSlider.image}
                        alt={currentSlider.title[locale] || ""}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Static Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Static Content - Title and Subtitle */}
            <div className="container relative mx-auto h-full px-4 flex flex-col justify-end pb-24 z-10">
                <div className="max-w-5xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {currentSlider.subtitle?.[locale] && (
                                <h2 className="text-white/70 font-medium uppercase tracking-[0.5em] text-xs md:text-sm mb-2 px-1">
                                    {currentSlider.subtitle[locale]}
                                </h2>
                            )}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-tight drop-shadow-2xl mb-6">
                                {currentSlider.title[locale]}
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Quick Info Bar - Sharp Modern Design */}
                <div className="mt-4">
                    <div className="inline-flex items-center divide-x divide-white/10 bg-black/80 backdrop-blur-sm">
                        {/* Status */}
                        <div className="flex items-center gap-2 px-4 py-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-white text-xs font-semibold tracking-wide">AÇIK</span>
                            <span className="text-white/50 text-xs">10:00 - 22:00</span>
                        </div>

                        {/* Location */}
                        <Link href="/contact" className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors">
                            <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span className="text-gold text-xs font-semibold tracking-wide">KONUM</span>
                        </Link>

                        {/* Shops */}
                        <Link href="/shops" className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors">
                            <span className="text-white/70 text-xs font-semibold tracking-wide">200+ MAĞAZA</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Controls (Simplified Dots) */}
            {sliders.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {sliders.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className="group py-4 px-2"
                        >
                            <div
                                className={`h-0.5 transition-all duration-500 rounded-full ${currentIndex === idx ? "w-10 bg-white" : "w-6 bg-white/30 group-hover:bg-white/50"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Decorative Lines */}
            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>
    );
}
