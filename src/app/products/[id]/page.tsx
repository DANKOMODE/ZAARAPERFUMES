"use client";

import { products, Variant } from '@/types/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, Droplets, Wind, Sun, ShoppingBag, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id === params.id);
    const { addToCart } = useCart();

    // Group variants by category
    const categories = useMemo(() => {
        if (!product) return [];
        return Array.from(new Set(product.variants.map(v => v.category)));
    }, [product]);

    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');

    // Filter sizes based on selected category
    const availableVariants = useMemo(() => {
        if (!product) return [];
        return product.variants.filter(v => v.category === selectedCategory);
    }, [product, selectedCategory]);

    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(availableVariants[0] || null);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return notFound();
    }

    // Update selected variant when category changes
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        const firstVar = product.variants.find(v => v.category === cat);
        if (firstVar) setSelectedVariant(firstVar);
    };

    return (
        <div className="bg-neutral-950 text-white min-h-screen py-12 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">

                <Link
                    href="/#collection"
                    className="inline-flex items-center gap-2 mb-10 text-xs uppercase tracking-widest text-amber-400/80 hover:text-amber-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-amber-400/30 shadow-2xl shadow-amber-500/10 group">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-bold tracking-[0.2em] text-amber-400 uppercase mb-3">
                                {selectedCategory || 'Eau de Parfum'}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-serif font-bold text-amber-400">
                                {selectedVariant ? `AED ${selectedVariant.price.toFixed(2)}` : 'Select Option'}
                            </p>
                        </div>

                        <div className="border-y border-amber-400/20 py-8 space-y-8">
                            <p className="text-base md:text-lg leading-relaxed text-neutral-300 font-light">
                                {product.description}
                            </p>

                            {/* Category Selector if multiple */}
                            {categories.length > 1 && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Select Variant</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => handleCategoryChange(cat)}
                                                className={cn(
                                                    "px-4 py-2 border text-sm font-medium transition-all duration-300 rounded-lg",
                                                    selectedCategory === cat
                                                        ? "border-amber-400 bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20"
                                                        : "border-amber-400/20 text-neutral-400 bg-neutral-900/50 hover:border-amber-400/60 hover:text-white"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selector */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Select Bottle Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {availableVariants.map((variant) => (
                                        <button
                                            key={variant.size}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={cn(
                                                "min-w-[100px] px-5 py-3 border text-sm font-medium transition-all duration-300 rounded-xl flex items-center justify-between gap-3",
                                                selectedVariant?.size === variant.size
                                                    ? "border-amber-400 bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20"
                                                    : "border-amber-400/20 text-neutral-300 bg-neutral-900/80 hover:border-amber-400/50 hover:text-white"
                                            )}
                                        >
                                            <span>{variant.size}</span>
                                            <span className="text-xs opacity-80">AED {variant.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex items-end gap-3 sm:gap-6">
                                {/* Quantity Selector */}
                                <div className="flex-shrink-0">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Quantity</h3>
                                    <div className="flex items-center border border-amber-400/30 rounded-xl h-[52px] bg-neutral-900">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="h-full px-4 text-amber-400 hover:bg-amber-400/10 transition-colors rounded-l-xl"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-10 sm:w-12 text-center text-white font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="h-full px-4 text-amber-400 hover:bg-amber-400/10 transition-colors rounded-r-xl"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => selectedVariant && addToCart(product, selectedVariant.size, selectedVariant.price, selectedVariant.category, quantity)}
                                    disabled={!selectedVariant}
                                    className="flex-1 bg-amber-400 text-neutral-950 font-bold h-[52px] px-4 sm:px-8 text-xs sm:text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors duration-300 shadow-xl shadow-amber-500/20 rounded-xl flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="whitespace-nowrap">Add to Selection</span>
                                </button>
                            </div>
                        </div>

                        {/* Olfactory Notes Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-serif text-amber-400 border-b border-amber-400/20 pb-2 inline-block">
                                Olfactory Notes Profile
                            </h3>
                            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                                <div className="bg-neutral-900/80 border border-amber-400/20 p-4 rounded-xl flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-amber-400">
                                        <Wind className="w-4 h-4" />
                                        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Top</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-300 leading-snug">{product.notes.top}</p>
                                </div>
                                <div className="bg-neutral-900/80 border border-amber-400/20 p-4 rounded-xl flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-amber-400">
                                        <Sun className="w-4 h-4" />
                                        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Heart</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-300 leading-snug">{product.notes.heart}</p>
                                </div>
                                <div className="bg-neutral-900/80 border border-amber-400/20 p-4 rounded-xl flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-amber-400">
                                        <Droplets className="w-4 h-4" />
                                        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Base</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-300 leading-snug">{product.notes.base}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
