"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { products, Product } from '@/types/products';
import Link from 'next/link';
import Image from 'next/image';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Handle click outside to close results
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length > 1) {
            const searchTerms = query.toLowerCase().split(' ');
            const filtered = products.filter(product => {
                const nameMatch = product.name.toLowerCase();
                const idMatch = (product as any).originalId?.toString() || "";

                // Check if all search terms match the name (allowing out of order "Aigner Black")
                return searchTerms.every(term => nameMatch.includes(term)) || idMatch === query;
            }).slice(0, 8); // Limit to 8 results

            setResults(filtered);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim().length > 0) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
            setQuery('');
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-md mx-auto md:mx-0">
            <form onSubmit={handleSearchSubmit} className="relative">
                <input
                    type="text"
                    placeholder="Search Eau de Parfum collection..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-900/90 border border-amber-400/30 rounded-full text-sm text-white focus:outline-none focus:border-amber-400 focus:bg-neutral-900 transition-all placeholder:text-neutral-500 shadow-inner"
                    onFocus={() => query.length > 1 && setIsOpen(true)}
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                {query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(''); setIsOpen(false); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-amber-400/10 rounded-full text-neutral-400 hover:text-white transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </form>

            {/* Results Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-amber-400/30 rounded-xl shadow-2xl shadow-amber-950/60 max-h-[70vh] overflow-y-auto z-50 text-white backdrop-blur-xl">
                    {results.length > 0 ? (
                        <div className="py-2">
                            <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-400/70 border-b border-amber-400/10 mb-1">
                                Fragrances Found
                            </div>
                            {results.map(product => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    onClick={() => { setIsOpen(false); setQuery(''); }}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-amber-400/10 transition-colors group border-b border-amber-400/5 last:border-0"
                                >
                                    <div className="relative w-10 h-10 bg-neutral-950 border border-amber-400/20 rounded-md overflow-hidden flex-shrink-0">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-sm font-medium text-amber-400 truncate pr-2 group-hover:text-amber-300">
                                                {product.name}
                                            </h4>
                                            {/* Show lowest price */}
                                            <span className="text-xs text-amber-400 font-bold whitespace-nowrap">
                                                AED {Math.min(...product.variants.map(v => v.price))}
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-400 truncate">
                                            {product.collectionTag || 'Eau de Parfum'} • 50ml / 100ml
                                        </p>
                                    </div>
                                </Link>
                            ))}
                            {/* See All Results Link */}
                            {results.length >= 8 && (
                                <Link
                                    href={`/search?q=${encodeURIComponent(query)}`}
                                    onClick={() => { setIsOpen(false); setQuery(''); }}
                                    className="block px-4 py-3 text-center text-sm font-medium text-amber-400 hover:bg-amber-400/10 border-t border-amber-400/20 mt-1 transition-colors"
                                >
                                    See All Results →
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-neutral-400">
                            No fragrance found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
