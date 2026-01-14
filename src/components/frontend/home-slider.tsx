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
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 1.1,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.9,
        }),
    };

    const currentSlider = sliders[currentIndex];

    return (
        <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden luxury-gradient">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                        scale: { duration: 10, ease: "linear" }, // Slow zoom effect
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={currentSlider.image}
                            alt={currentSlider.title[locale] || ""}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent md:from-navy/90 md:via-navy/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-navy/30" />
                    </div>

                    {/* Content */}
                    <div className="container relative mx-auto h-full px-4 flex flex-col justify-end pb-32">
                        <div className="max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            >
                                {currentSlider.subtitle?.[locale] && (
                                    <h2 className="text-white/70 font-medium uppercase tracking-[0.5em] text-xs md:text-sm mb-0 px-2">
                                        {currentSlider.subtitle[locale]}
                                    </h2>
                                )}
                                <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold text-white leading-[0.8] uppercase tracking-tighter drop-shadow-2xl mb-8">
                                    {currentSlider.title[locale]}
                                </h1>
                            </motion.div>
                        </div>

                        {/* Bottom Info Bar (Matching User Reference) */}
                        <div className="absolute bottom-12 left-4 md:left-8 z-20">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="flex flex-col md:flex-row items-stretch bg-black/60 backdrop-blur-2xl border-s-[6px] border-gold overflow-hidden shadow-2xl"
                            >
                                {/* Working Hours */}
                                <div className="flex items-center gap-5 px-8 py-5 border-b border-white/5 md:border-b-0 md:border-e border-white/10">
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/10">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5">Çalışma Saatleri</p>
                                        <p className="text-white font-bold tracking-wide">10:00 - 22:00</p>
                                    </div>
                                </div>

                                {/* Visit Plan */}
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-5 px-8 py-5 hover:bg-white/10 transition-all group"
                                >
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/10 group-hover:border-gold/50 transition-colors">
                                        <svg className="w-6 h-6 text-white group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5">Ziyaret Planı</p>
                                        <p className="text-gold group-hover:text-gold-light transition-colors font-bold tracking-wide underline underline-offset-4 decoration-gold/30 group-hover:decoration-gold">AVM Haritayı Görüntüle</p>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

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
