"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COVER_SLIDES, CoverSlide } from './Hero';
import { Sparkles, ArrowRight, X, Eye } from 'lucide-react';

export function MasterpieceGallery() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [activeModalPoster, setActiveModalPoster] = useState<CoverSlide | null>(null);

    const categories = [
        'All',
        'Oud & Arabian',
        'Floral & Musk',
        'Sweet Gourmand',
        'Fresh & Fruity',
        'Princess & Fairytale'
    ];

    const getCategoryForPoster = (poster: CoverSlide) => {
        const title = poster.title.toUpperCase();
        const top = poster.notes.top.toUpperCase();
        const heart = poster.notes.heart.toUpperCase();
        const base = poster.notes.base.toUpperCase();
        const notesStr = `${top} ${heart} ${base}`;

        if (['PINK BARBIE', 'BARBIE DOLL'].includes(title)) return 'Princess & Fairytale';

        if (title.includes('OUD') || title.includes('FAREED') || title.includes('CASANOVA') || title.includes('TARAF') || title.includes('MARJ') || notesStr.includes('OUD') || notesStr.includes('SAFFRON')) {
            return 'Oud & Arabian';
        }

        if (title.includes('VANILLA') || title.includes('CHOCO') || title.includes('CANDY') || title.includes('NESTLE') || notesStr.includes('CARAMEL') || notesStr.includes('HONEY') || notesStr.includes('CHOCOLATE')) {
            return 'Sweet Gourmand';
        }

        if (title.includes('MUSK') || title.includes('ROSÉ') || title.includes('ROSE') || title.includes('CASABELLA') || title.includes('ROZARIO') || title.includes('LATTE') || notesStr.includes('ROSE') || notesStr.includes('LILY')) {
            return 'Floral & Musk';
        }

        return 'Fresh & Fruity';
    };

    const filteredPosters = selectedCategory === 'All'
        ? COVER_SLIDES
        : COVER_SLIDES.filter(slide => getCategoryForPoster(slide) === selectedCategory);

    return (
        <section id="masterpiece-gallery" className="py-16 md:py-24 bg-gradient-to-b from-neutral-950 via-brand-primary to-neutral-950 text-white relative overflow-hidden">
            
            {/* Background Decorative Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-amber-400/30 bg-amber-400/10 text-amber-300 mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Zaara Masterpiece Collection</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
                        Exclusive Fragrance Poster Artworks
                    </h2>

                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                        Explore our luxury perfume poster artworks, showcasing the exquisite notes, elegance, and storytelling behind each signature blend.
                    </p>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
                                    selectedCategory === cat
                                        ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-lg shadow-amber-400/20 scale-105'
                                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Poster Artwork Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredPosters.map((poster) => (
                        <div
                            key={poster.id}
                            className="group relative bg-neutral-900/80 rounded-2xl overflow-hidden border border-amber-400/20 shadow-xl hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
                        >
                            {/* Poster Image Frame */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black cursor-pointer" onClick={() => setActiveModalPoster(poster)}>
                                <Image
                                    src={poster.image}
                                    alt={poster.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Dark Gradient Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                                {/* Quick Preview Icon */}
                                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Eye className="w-4 h-4" />
                                </div>

                                {/* Poster Text Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                    <span className="block text-[10px] font-bold tracking-widest text-amber-300 uppercase mb-1">
                                        {poster.badge}
                                    </span>
                                    <h3 className="text-lg font-serif font-bold text-white mb-1 truncate">
                                        {poster.title}
                                    </h3>
                                    <p className="text-xs text-gray-300 line-clamp-1 italic">
                                        {poster.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Card Bottom Actions */}
                            <div className="p-3 border-t border-white/10 bg-neutral-950 flex items-center justify-between gap-2">
                                <button
                                    onClick={() => setActiveModalPoster(poster)}
                                    className="text-xs font-semibold uppercase tracking-wider text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    View Poster
                                </button>

                                <Link
                                    href={poster.link}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
                                >
                                    Order
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Poster Lightbox Modal */}
            {activeModalPoster && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
                    <div className="relative w-full max-w-4xl bg-neutral-950 border border-amber-400/40 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">

                        {/* Close Modal Button */}
                        <button
                            onClick={() => setActiveModalPoster(null)}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Poster Image View */}
                        <div className="md:col-span-7 relative aspect-[4/5] bg-black">
                            <Image
                                src={activeModalPoster.image}
                                alt={activeModalPoster.title}
                                fill
                                className="object-contain p-2"
                            />
                        </div>

                        {/* Poster Details Sidebar */}
                        <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/30 mb-3">
                                    {activeModalPoster.badge}
                                </span>

                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                                    {activeModalPoster.title}
                                </h3>

                                <p className="text-xs md:text-sm text-gray-300 italic mb-6">
                                    "{activeModalPoster.tagline}"
                                </p>

                                {/* Olfactory Notes */}
                                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">Fragrance Pyramid Notes</h4>
                                    
                                    <div className="space-y-2 text-xs text-gray-200">
                                        <div>
                                            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">Top Note:</span>
                                            {activeModalPoster.notes.top}
                                        </div>
                                        <div>
                                            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">Heart Note:</span>
                                            {activeModalPoster.notes.heart}
                                        </div>
                                        <div>
                                            <span className="font-bold text-white uppercase tracking-wider block text-[10px]">Base Note:</span>
                                            {activeModalPoster.notes.base}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Action Links */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                                <button
                                    onClick={() => setActiveModalPoster(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                                >
                                    Close Preview
                                </button>

                                <Link
                                    href={activeModalPoster.link}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
                                >
                                    Go To Product
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
}
