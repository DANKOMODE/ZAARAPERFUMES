"use client";

import { Product } from '@/types/products';
import Link from 'next/link';
import { ExternalLink, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductListViewProps {
    products: Product[];
    showVariantHeaders?: boolean;
}

export function ProductListView({ products }: ProductListViewProps) {
    const { addToCart } = useCart();
    return (
        <div className="bg-neutral-900/90 rounded-2xl border border-amber-400/20 overflow-hidden shadow-2xl text-white">
            {/* Table Header */}
            <div className="bg-neutral-950 border-b border-amber-400/20 px-6 py-4 grid grid-cols-12 gap-4 font-bold text-xs uppercase tracking-widest text-amber-300">
                <div className="col-span-5 md:col-span-4">Fragrance Name</div>
                <div className="hidden md:block md:col-span-3">Top Notes</div>
                <div className="col-span-5 md:col-span-3 text-center">Retail Options & Pricing</div>
                <div className="col-span-2 md:col-span-2 text-right">Details</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors group"
                    >
                        {/* Product Name */}
                        <div className="col-span-5 md:col-span-4">
                            <Link
                                href={`/products/${product.id}`}
                                className="font-serif font-bold text-sm md:text-base text-white hover:text-amber-300 transition-colors block truncate"
                            >
                                {product.name}
                            </Link>
                            <span className="text-[10px] text-gray-400 block truncate">{product.description}</span>
                        </div>

                        {/* Top Notes */}
                        <div className="hidden md:block md:col-span-3 text-xs text-gray-300 italic truncate">
                            {product.notes ? product.notes.top : "Fine EDP Blend"}
                        </div>

                        {/* Prices & Sizes */}
                        <div className="col-span-5 md:col-span-3 flex items-center justify-center gap-2 flex-wrap text-xs">
                            {product.variants.map((v) => (
                                <button
                                    key={v.size}
                                    onClick={() => addToCart(product, v.size, v.price, v.category || 'Eau de Parfum', 1)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-amber-400/30 hover:bg-amber-400 hover:text-neutral-950 text-amber-300 font-semibold transition-all shadow-sm"
                                    title={`Add ${v.size} to cart`}
                                >
                                    <span>{v.size}: AED {v.price}</span>
                                    <Plus className="w-3 h-3" />
                                </button>
                            ))}
                        </div>

                        {/* Action Link */}
                        <div className="col-span-2 md:col-span-2 text-right">
                            <Link
                                href={`/products/${product.id}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
                            >
                                <span className="hidden md:inline">View</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
