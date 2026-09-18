"use client";

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/types/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductListView } from '@/components/ProductListView';
import { ChevronDown, Grid3x3, List } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';

type SortOption = 'name-asc' | 'price-low' | 'price-high';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [sortBy, setSortBy] = useState<SortOption>('name-asc');
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Search logic
    const searchResults = useMemo(() => {
        if (!query.trim()) return [];

        const searchTerms = query.toLowerCase().split(' ');
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase();
            const idMatch = (product as any).originalId?.toString() || "";

            // Check if all search terms match the name or if ID matches exactly
            return searchTerms.every(term => nameMatch.includes(term)) || idMatch === query;
        });
    }, [query]);

    // Get unique sizes
    const availableSizes = useMemo(() => {
        const allSizes = new Set<string>();
        products.forEach(p => p.variants.forEach(v => allSizes.add(v.size)));
        return Array.from(allSizes).sort((a, b) => {
            const order = ['100ml', '250ml', '500ml', '1Kg'];
            return order.indexOf(a) - order.indexOf(b);
        });
    }, []);

    // Filter and Sort
    const processedProducts = useMemo(() => {
        let result = [...searchResults];

        // Filter by collection category
        if (selectedCategories.length > 0) {
            result = result.filter(p => p.collectionTag && selectedCategories.includes(p.collectionTag));
        }

        // Filter by size
        if (selectedSizes.length > 0) {
            result = result.filter(p =>
                p.variants.some(v => selectedSizes.includes(v.size))
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'name-asc') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'price-low') {
                const minA = Math.min(...a.variants.map(v => v.price));
                const minB = Math.min(...b.variants.map(v => v.price));
                return minA - minB;
            } else if (sortBy === 'price-high') {
                const maxA = Math.max(...a.variants.map(v => v.price));
                const maxB = Math.max(...b.variants.map(v => v.price));
                return maxB - maxA;
            }
            return 0;
        });

        return result;
    }, [searchResults, selectedSizes, selectedCategories, sortBy]);

    const itemsPerPage = 24;
    const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
    const displayedProducts = processedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
        setPage(1);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
        setPage(1);
    };

    return (
        <div className="bg-neutral-950 text-white min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
                        Search Fragrances
                    </h1>

                    {/* Dedicated Search Bar for Results Page */}
                    <div className="max-w-2xl mx-auto w-full px-2">
                        <SearchBar />
                    </div>

                    {query && (
                        <p className="text-neutral-400 max-w-2xl mx-auto pt-2">
                            {searchResults.length > 0
                                ? `Found ${searchResults.length} fragrance${searchResults.length !== 1 ? 's' : ''} for "${query}"`
                                : `No fragrances found for "${query}"`
                            }
                        </p>
                    )}
                    <div className="h-0.5 w-20 bg-amber-400 mx-auto mt-4 rounded-full" />
                </div>

                {searchResults.length > 0 && (
                    <>
                        {/* Filters & Sort Bar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8 pb-6 border-b border-amber-400/20 bg-neutral-900/40 p-4 rounded-2xl border">

                            {/* View Toggle */}
                            <div className="flex items-center gap-2 md:border-r border-amber-400/20 md:pr-4">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-amber-400/20'
                                        }`}
                                    title="Grid view"
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2.5 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-amber-400/20'
                                        }`}
                                    title="List view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-3">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Sort:
                                </label>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => { setSortBy(e.target.value as SortOption); setPage(1); }}
                                        className="appearance-none bg-neutral-900 border border-amber-400/30 rounded-xl px-4 py-2 pr-10 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                                    >
                                        <option value="name-asc">Name (A-Z)</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Size Filters */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    Size:
                                </label>
                                {['50ml', '100ml'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={`px-3 py-1.5 text-xs border rounded-full transition-all ${selectedSizes.includes(size)
                                            ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-400/20'
                                            : 'bg-neutral-900 border-amber-400/20 text-neutral-400 hover:border-amber-400/60 hover:text-white'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                                {selectedSizes.length > 0 && (
                                    <button
                                        onClick={() => { setSelectedSizes([]); setPage(1); }}
                                        className="text-xs text-amber-400 underline ml-2"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="flex justify-between items-center mb-8 text-xs text-neutral-400">
                            <span>Showing {processedProducts.length} fragrances</span>
                            <span className="uppercase tracking-widest text-[10px] text-amber-400/80">
                                {viewMode === 'grid' ? 'Grid View' : 'List View'}
                            </span>
                        </div>

                        {/* Product Display */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {displayedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <ProductListView
                                products={displayedProducts}
                                showVariantHeaders={true}
                            />
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-3 mt-16">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-neutral-900 border border-amber-400/30 rounded-xl text-xs font-semibold text-white disabled:opacity-30 hover:bg-amber-400 hover:text-neutral-950 transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-xs text-neutral-400">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-neutral-900 border border-amber-400/30 rounded-xl text-xs font-semibold text-white disabled:opacity-30 hover:bg-amber-400 hover:text-neutral-950 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-brand-primary font-serif animate-pulse">Searching catalogue...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
