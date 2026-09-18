"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight } from 'lucide-react';

export interface CoverSlide {
    id: string;
    badge: string;
    title: string;
    tagline: string;
    notes: { top: string; heart: string; base: string };
    image: string;
    link: string;
    bgGradient: string;
    accentColor: string;
    glowColor: string;
}

export const COVER_SLIDES: CoverSlide[] = [
    {
        id: "oud-noir",
        badge: "Oud Noir Collection",
        title: "OUD NOIR",
        tagline: "Dark Elegance in Every Drop • Rich, Mysterious, Unforgettable",
        notes: { top: "Oud, Saffron & Spices", heart: "Rose, Incense & Amber", base: "Oud Wood, Musk & Vanilla" },
        image: "/images/posters/oud-noir.jpg",
        link: "/products/poster-1",
        bgGradient: "from-neutral-950 via-amber-950/80 to-stone-950",
        accentColor: "text-amber-400 border-amber-400/40 bg-amber-400/10",
        glowColor: "rgba(217, 119, 6, 0.35)"
    },
    {
        id: "fareed",
        badge: "Signature Collection",
        title: "FAREED",
        tagline: "A Signature of Distinction • Timeless Arabian Elegance",
        notes: { top: "Bergamot & Warm Spices", heart: "Damask Rose & Woods", base: "Royal Oud & Dark Amber" },
        image: "/images/posters/fareed.jpg",
        link: "/products/poster-2",
        bgGradient: "from-neutral-950 via-emerald-950/80 to-neutral-950",
        accentColor: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
        glowColor: "rgba(16, 185, 129, 0.35)"
    },
    {
        id: "vanilla-voyage",
        badge: "Maison Asrar Series",
        title: "VANILLA VOYAGE",
        tagline: "A Journey into Sweet Elegance • Sweet, Warm, Unforgettable",
        notes: { top: "Caramel & Rich Butter", heart: "Honey, Tonka & Jasmine", base: "Vanilla, Amber & Musk" },
        image: "/images/posters/vanilla-voyage.jpg",
        link: "/products/poster-3",
        bgGradient: "from-amber-950 via-stone-900 to-neutral-950",
        accentColor: "text-orange-300 border-orange-400/40 bg-orange-400/10",
        glowColor: "rgba(251, 146, 60, 0.35)"
    },
    {
        id: "rose",
        badge: "Floral Collection",
        title: "ROSÉ MAISON ASRAR",
        tagline: "A Fragrance that Blooms With You • Soft, Radiant, Unforgettable",
        notes: { top: "Blackberry & Bergamot", heart: "Lotus Flower & Rose", base: "Vanilla & Amber Sandalwood" },
        image: "/images/posters/rose.jpg",
        link: "/products/poster-4",
        bgGradient: "from-rose-950 via-pink-950/70 to-neutral-950",
        accentColor: "text-rose-300 border-rose-400/40 bg-rose-400/10",
        glowColor: "rgba(244, 63, 94, 0.35)"
    },
    {
        id: "casabella",
        badge: "Classics Collection",
        title: "CASABELLA",
        tagline: "A Story of Elegance • Two Worlds, One Extraordinary Scent",
        notes: { top: "White Florals & Citrus", heart: "Turkish Rose & Jasmine", base: "Sensual Musk & Amber" },
        image: "/images/posters/casabella.jpg",
        link: "/products/poster-5",
        bgGradient: "from-amber-950 via-neutral-900 to-stone-950",
        accentColor: "text-amber-300 border-amber-400/40 bg-amber-400/10",
        glowColor: "rgba(245, 158, 11, 0.35)"
    },
    {
        id: "blue-musk",
        badge: "Fresh & Marine Series",
        title: "BLUE MUSK",
        tagline: "A Scent Beyond Time • Fresh, Elegant, Masculine & Unforgettable",
        notes: { top: "Marine Breeze & Citrus", heart: "Lavender & White Floral", base: "Pure Musk & Cedar" },
        image: "/images/posters/blue-musk.jpg",
        link: "/products/poster-6",
        bgGradient: "from-slate-950 via-blue-950/90 to-slate-900",
        accentColor: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10",
        glowColor: "rgba(6, 182, 212, 0.35)"
    },
    {
        id: "vanilla-aura",
        badge: "Gourmand Series",
        title: "VANILLA AURA",
        tagline: "Scents Beyond Boundaries • A Fragrance that Leaves a Lasting Aura",
        notes: { top: "Bergamot & Lemon", heart: "Vanilla, Chocolate & Caramel", base: "Vanilla, Amber & Tonka" },
        image: "/images/posters/vanilla-aura.jpg",
        link: "/products/poster-7",
        bgGradient: "from-yellow-950 via-stone-900 to-amber-950",
        accentColor: "text-yellow-300 border-yellow-400/40 bg-yellow-400/10",
        glowColor: "rgba(234, 179, 8, 0.35)"
    },
    {
        id: "casanova",
        badge: "Tiziana Terenzi Inspired",
        title: "CASANOVA",
        tagline: "A Fragrance Beyond Moments • A Legendary Fragrance of Passion",
        notes: { top: "Bright Bergamot", heart: "Refined Spices", base: "Deep Sensual Woods" },
        image: "/images/posters/casanova.jpg",
        link: "/products/poster-8",
        bgGradient: "from-neutral-950 via-amber-950/80 to-stone-950",
        accentColor: "text-amber-400 border-amber-400/40 bg-amber-400/10",
        glowColor: "rgba(245, 158, 11, 0.35)"
    },
    {
        id: "pink-barbie",
        badge: "Princess Edition",
        title: "PINK BARBIE",
        tagline: "Be Bold, Be Beautiful, Be You • More than a Fragrance, A Feeling",
        notes: { top: "Sweet Raspberry & Peony", heart: "Rose & Jasmine Blossom", base: "Sparkling Musk & Amber" },
        image: "/images/posters/pink-barbie.jpg",
        link: "/products/poster-9",
        bgGradient: "from-pink-950 via-rose-950/80 to-neutral-950",
        accentColor: "text-pink-300 border-pink-400/40 bg-pink-400/10",
        glowColor: "rgba(236, 72, 153, 0.35)"
    },
    {
        id: "barbie-doll",
        badge: "Fairytale Collection",
        title: "BARBIE DOLL",
        tagline: "More than a Fragrance, A Fairytale Feeling • Sweet & Unforgettable",
        notes: { top: "Sweet Orchid & Bergamot", heart: "Purple Violet & Plum", base: "Velvet Musk & Vanilla" },
        image: "/images/posters/barbie-doll.jpg",
        link: "/products/poster-10",
        bgGradient: "from-purple-950 via-pink-950/70 to-neutral-950",
        accentColor: "text-purple-300 border-purple-400/40 bg-purple-400/10",
        glowColor: "rgba(168, 85, 247, 0.35)"
    },
    {
        id: "musk-baby",
        badge: "Pure Musk Collection",
        title: "MUSK BABY",
        tagline: "A Touch of Pure Love • Softness that Stays with You",
        notes: { top: "Soft Powder & Lily", heart: "Clean Cotton & Rose", base: "Pure Musk & Cashmere" },
        image: "/images/posters/musk-baby.jpg",
        link: "/products/poster-11",
        bgGradient: "from-rose-950 via-stone-900 to-neutral-950",
        accentColor: "text-rose-300 border-rose-400/40 bg-rose-400/10",
        glowColor: "rgba(244, 63, 94, 0.35)"
    },
    {
        id: "pink-musk",
        badge: "Luxury Musk Series",
        title: "PINK MUSK",
        tagline: "Pure Musk, Pure You • Soft, Elegant, Unforgettable",
        notes: { top: "Cherry Blossom & Peach", heart: "Pink Rose & Magnolia", base: "White Musk & Amber" },
        image: "/images/posters/pink-musk.jpg",
        link: "/products/poster-12",
        bgGradient: "from-pink-950 via-stone-900 to-neutral-950",
        accentColor: "text-pink-300 border-pink-400/40 bg-pink-400/10",
        glowColor: "rgba(244, 114, 182, 0.35)"
    },
    {
        id: "rozario",
        badge: "Elegance Collection",
        title: "ROZARIO",
        tagline: "Elegance in Every Drop • Two Souls, One Essence",
        notes: { top: "Pear, Calone & Tangerine", heart: "Watermelon, Strawberry & Rose", base: "Sweet Praline, Musk & Amber" },
        image: "/images/posters/rozario.jpg",
        link: "/products/poster-13",
        bgGradient: "from-rose-950 via-amber-950/70 to-neutral-950",
        accentColor: "text-red-300 border-red-400/40 bg-red-400/10",
        glowColor: "rgba(239, 68, 68, 0.35)"
    }
];

export function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);

    const slideDuration = 5000;
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isPlaying || isHovered) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return;
        }

        const startTime = Date.now();
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / slideDuration) * 100, 100);
            setProgress(pct);

            if (pct >= 100) {
                setCurrentIndex((prev) => (prev + 1) % COVER_SLIDES.length);
                setProgress(0);
            }
        };

        setProgress(0);
        progressIntervalRef.current = setInterval(updateProgress, 50);

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [currentIndex, isPlaying, isHovered]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % COVER_SLIDES.length);
        setProgress(0);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + COVER_SLIDES.length) % COVER_SLIDES.length);
        setProgress(0);
    };

    const activeSlide = COVER_SLIDES[currentIndex];

    return (
        <section
            className={`relative min-h-[85vh] md:min-h-[82vh] flex flex-col justify-between overflow-hidden bg-gradient-to-br ${activeSlide.bgGradient} text-white transition-all duration-1000 select-none`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Ambient Glow */}
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-1000"
                style={{
                    background: `radial-gradient(circle at 65% 50%, ${activeSlide.glowColor} 0%, transparent 65%)`
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            {/* Main Content Container */}
            <div className="container relative z-10 mx-auto px-4 pt-8 pb-6 md:py-12 flex-1 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">

                    {/* Left Details Panel */}
                    <div className="lg:col-span-6 space-y-4 md:space-y-6 text-center lg:text-left">
                        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-700 backdrop-blur-md ${activeSlide.accentColor}`}>
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            <span>{activeSlide.badge}</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight transition-all duration-700">
                            {activeSlide.title}
                        </h1>

                        <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed italic">
                            "{activeSlide.tagline}"
                        </p>

                        {/* Olfactory Breakdown Pill */}
                        <div className="pt-2">
                            <div className="inline-grid grid-cols-3 gap-2 md:gap-4 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-left max-w-lg mx-auto lg:mx-0 shadow-lg">
                                <div className="border-r border-white/15 pr-2">
                                    <span className="block text-[9px] uppercase tracking-wider text-amber-300 font-bold">Top Note</span>
                                    <span className="text-xs text-white font-medium truncate block">{activeSlide.notes.top}</span>
                                </div>
                                <div className="border-r border-white/15 pr-2">
                                    <span className="block text-[9px] uppercase tracking-wider text-amber-300 font-bold">Heart Note</span>
                                    <span className="text-xs text-white font-medium truncate block">{activeSlide.notes.heart}</span>
                                </div>
                                <div>
                                    <span className="block text-[9px] uppercase tracking-wider text-amber-300 font-bold">Base Note</span>
                                    <span className="text-xs text-white font-medium truncate block">{activeSlide.notes.base}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            <Link
                                href={activeSlide.link}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs md:text-sm tracking-widest uppercase hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-0.5"
                            >
                                View Fragrance & Order
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <a
                                href="#masterpiece-gallery"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm tracking-widest uppercase transition-all backdrop-blur-md"
                            >
                                View Poster Gallery
                            </a>
                        </div>
                    </div>

                    {/* Right Artwork Poster Showcase Frame */}
                    <div className="lg:col-span-6 flex justify-center items-center relative py-2 lg:py-0">
                        <div
                            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-all duration-1000 opacity-70"
                            style={{ backgroundColor: activeSlide.glowColor }}
                        />

                        {/* Luxury Frame Container */}
                        <div className="relative w-64 sm:w-72 md:w-80 lg:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
                            <Image
                                key={activeSlide.id}
                                src={activeSlide.image}
                                alt={activeSlide.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Navigation & Thumbnail Bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-md py-3 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-1.5 rounded-full hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                            title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
                        >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>

                        <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono font-bold">
                            <span className="text-amber-400">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span>/</span>
                            <span>{String(COVER_SLIDES.length).padStart(2, '0')}</span>
                        </div>

                        <div className="w-24 sm:w-36 h-1.5 bg-white/15 rounded-full overflow-hidden ml-2">
                            <div
                                className="h-full bg-amber-400 transition-all duration-75"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Scrollable Thumbnails */}
                    <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 scrollbar-hide">
                        {COVER_SLIDES.map((slide, idx) => (
                            <button
                                key={slide.id}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    setProgress(0);
                                }}
                                className={`flex-shrink-0 relative w-9 h-11 rounded-md overflow-hidden transition-all border ${
                                    idx === currentIndex
                                        ? 'border-amber-400 scale-110 shadow-lg ring-2 ring-amber-400/50'
                                        : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-105'
                                }`}
                                title={slide.title}
                            >
                                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/25 text-white transition-all"
                            aria-label="Previous Poster"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/25 text-white transition-all"
                            aria-label="Next Poster"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
