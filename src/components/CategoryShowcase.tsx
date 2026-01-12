"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Gem, Leaf } from 'lucide-react';

const categories = [
    {
        id: 'classics',
        name: 'Zaara Classics',
        description: 'Economy-grade fragrance oils for bulk wholesale orders.',
        icon: Leaf,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop', // Fresh/Green vibe
        color: 'bg-emerald-900',
        link: '/collection/classics'
    },
    {
        id: 'signature',
        name: "Zaara's Signature",
        description: 'Inspired perfume concentrates matching luxury brand essences.',
        icon: Sparkles,
        image: 'https://images.unsplash.com/photo-1595535373192-fc0435369650?q=80&w=1000&auto=format&fit=crop', // Gold/Warm vibe
        color: 'bg-brand-primary',
        link: '/collection/signature'
    },
    {
        id: 'top-quality',
        name: 'Top Quality',
        description: 'Identical-grade fragrance oils for premium wholesale clients.',
        icon: Gem,
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop', // Dark/Premium
        color: 'bg-black',
        link: '/collection/top-quality'
    }
];

export function CategoryShowcase() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-4">
                        Curated Collections
                    </h2>
                    <p className="text-brand-primary/60 max-w-2xl mx-auto">
                        Choose your preferred grade. Bulk wholesale pricing available for all ranges.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link
                            href={cat.link}
                            key={cat.id}
                            className="group relative h-[500px] overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className={`absolute inset-0 ${cat.color} opacity-60 transition-opacity duration-500 group-hover:opacity-70`} />

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                                <cat.icon className="w-12 h-12 mb-6 opacity-90" />
                                <h3 className="text-2xl font-serif font-bold mb-4 tracking-wider">
                                    {cat.name}
                                </h3>
                                <p className="text-white/80 font-light mb-8 max-w-xs transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                    {cat.description}
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-white/0 group-hover:border-white/100 transition-colors pb-1">
                                    Explore
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
