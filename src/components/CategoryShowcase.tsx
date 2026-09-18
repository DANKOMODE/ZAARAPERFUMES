"use client";

import { products } from '@/types/products';
import { ProductCard } from './ProductCard';
import { Sparkles, ShoppingBag } from 'lucide-react';

export function CategoryShowcase() {
    return (
        <section id="collection" className="py-16 md:py-24 bg-gray-50/80 border-t border-gray-200">
            <div className="container mx-auto px-4">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-primary/10 text-brand-primary mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Retail EDP Catalog</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-primary mb-4">
                        The Masterpiece Eau de Parfum Collection
                    </h2>

                    <p className="text-brand-primary/70 text-sm md:text-base leading-relaxed">
                        Discover our 13 signature retail fragrances, handcrafted with luxury ingredients and available in 50ml (75 AED) & 100ml (150 AED) bottles.
                    </p>

                    <div className="h-1 w-20 bg-brand-accent mx-auto mt-6 rounded-full" />
                </div>

                {/* 13 Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </section>
    );
}
