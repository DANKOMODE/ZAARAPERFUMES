"use client";

import { products } from '@/types/products';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function FeaturedCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const featuredProducts = products;

    const updateScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        updateScrollButtons();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            return () => container.removeEventListener('scroll', updateScrollButtons);
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 360;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white via-brand-light/30 to-white">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-accent/10 text-brand-accent mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Featured Retail Line</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-3">
                        Zaara Eau de Parfum Masterpiece Collection
                    </h2>
                    <p className="text-brand-primary/70 max-w-2xl mx-auto text-sm md:text-base">
                        Explore our luxury retail fragrances available in 50ml (75 AED) & 100ml (150 AED)
                    </p>
                    <div className="h-1 w-20 bg-brand-accent mx-auto mt-5 rounded-full" />
                </div>

                {/* Carousel Container */}
                <div className="relative group">

                    {/* Left Arrow */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-gray-200 hover:bg-white transition-all opacity-90 group-hover:opacity-100 hover:scale-110"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 text-brand-primary" />
                        </button>
                    )}

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 pt-2 px-2"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {featuredProducts.map(product => (
                            <div key={product.id} className="flex-shrink-0 w-64 md:w-72 snap-start">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-gray-200 hover:bg-white transition-all opacity-90 group-hover:opacity-100 hover:scale-110"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 text-brand-primary" />
                        </button>
                    )}

                </div>

            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
