"use client";

import { useState, useMemo } from 'react';
import { products, Product } from '@/types/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductListView } from '@/components/ProductListView';
import { ChevronDown, Grid3x3, List, Sparkles } from 'lucide-react';

type SortOption = 'name-asc' | 'price-low' | 'price-high';

export default function CollectionPage({ params }: { params: { type: string } }) {

    const info = {
        title: 'Zaara Eau de Parfum Masterpiece Collection',
        description: 'Exclusive retail fragrance collection. Available in 50ml (75 AED) & 100ml (150 AED).'
    };

    // State
    const [sortBy, setSortBy] = useState<SortOption>('name-asc');
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Available sizes
    const availableSizes = ['50ml', '100ml'];

    // Filter and Sort
    const processedProducts = useMemo(() => {
        let result = [...products];

        // Filter by size if selected
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
    }, [selectedSizes, sortBy]);

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

    return (
        <div className="bg-white min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-accent/10 text-brand-accent">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Retail Collection</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">
                        {info.title}
                    </h1>
                    <p className="text-brand-primary/60 max-w-2xl mx-auto">
                        {info.description}
                    </p>
                    <div className="h-1 w-20 bg-brand-accent mx-auto mt-6 rounded-full" />
                </div>

                {/* Filters & Sort Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 pb-6 border-b border-brand-primary/10 items-center justify-between">

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded transition-colors ${viewMode === 'grid'
                                ? 'bg-brand-primary text-white'
                                : 'bg-white text-brand-primary/40 hover:text-brand-primary border border-brand-primary/20'
                                }`}
                            title="Grid view"
                        >
                            <Grid3x3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded transition-colors ${viewMode === 'list'
                                ? 'bg-brand-primary text-white'
                                : 'bg-white text-brand-primary/40 hover:text-brand-primary border border-brand-primary/20'
                                }`}
                            title="List view"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Sort & Filter Controls */}
                    <div className="flex items-center gap-4 flex-wrap justify-center">

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-semibold text-brand-primary/60 uppercase tracking-wider">
                                Sort:
                            </label>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => { setSortBy(e.target.value as SortOption); setPage(1); }}
                                    className="appearance-none bg-white border border-brand-primary/20 rounded-md px-3 py-1.5 pr-8 text-xs text-brand-primary focus:outline-none cursor-pointer"
                                >
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-primary/40 pointer-events-none" />
                            </div>
                        </div>

                        {/* Size Filters */}
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-semibold text-brand-primary/60 uppercase tracking-wider">
                                Size:
                            </label>
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => toggleSize(size)}
                                    className={`px-3 py-1 text-xs border rounded-full transition-all ${selectedSizes.includes(size)
                                        ? 'bg-brand-primary text-white border-brand-primary'
                                        : 'border-brand-primary/20 text-brand-primary/60 hover:border-brand-primary/50'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                            {selectedSizes.length > 0 && (
                                <button
                                    onClick={() => { setSelectedSizes([]); setPage(1); }}
                                    className="text-xs text-brand-accent underline ml-1"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                    </div>
                </div>

                {/* Product Display - Grid or List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <ProductListView
                        products={displayedProducts}
                    />
                )}

            </div>
        </div>
    );
}
