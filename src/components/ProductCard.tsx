"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/products';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const lowestPrice = product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 75;

    return (
        <div className="group relative flex flex-col justify-between bg-neutral-900/90 rounded-2xl overflow-hidden border border-amber-400/20 hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10">

            {/* Poster Image Frame */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20 opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                    Eau de Parfum
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 md:p-5 text-center flex-1 flex flex-col justify-between bg-neutral-950/90 border-t border-white/5">
                <div>
                    <h3 className="mb-1 text-sm md:text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {product.name}
                    </h3>
                    <p className="mb-3 text-xs md:text-sm font-semibold text-amber-400 font-sans">
                        from AED {lowestPrice.toFixed(2)}
                    </p>
                </div>

                {/* View Details Button */}
                <Link
                    href={`/products/${product.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10 transform active:scale-95"
                >
                    <span>View & Order</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
