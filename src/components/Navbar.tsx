"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import Image from 'next/image';

export function Navbar() {
    const { openCart, totalItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleInquiry = () => {
        const whatsappNumber = "971588978103";
        const message = encodeURIComponent("Hello ZAARA PERFUMES! I am interested in ordering your Eau de Parfum collection.");
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-amber-400/20 bg-neutral-950/90 backdrop-blur-md text-white shadow-2xl">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 items-center justify-between">

                    {/* Logo & Brand Name */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-11 h-11 bg-neutral-900 rounded-xl p-1 shadow-md border border-amber-400/30 transition-all duration-300 group-hover:border-amber-400 group-hover:-translate-y-0.5">
                            <Image
                                src="/images/logo.png"
                                alt="ZAARA PERFUMES Logo"
                                fill
                                className="object-contain rounded-lg"
                                priority
                            />
                        </div>
                        <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-amber-400 hidden sm:block group-hover:text-amber-300 transition-colors">
                            ZAARA PERFUMES
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8 items-center text-xs uppercase tracking-widest font-semibold text-gray-300">
                        <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                        <Link href="/#masterpiece-gallery" className="hover:text-amber-400 transition-colors">Gallery</Link>
                        <Link href="/#collection" className="hover:text-amber-400 transition-colors">Catalog</Link>
                        <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:block flex-1 max-w-sm mx-6">
                        <SearchBar />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 md:gap-4">

                        {/* Cart Button */}
                        <button
                            onClick={openCart}
                            className="relative p-2 text-gray-200 hover:text-amber-400 transition-colors rounded-full hover:bg-white/5"
                            aria-label="Open Shopping Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-neutral-950 shadow-md animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Order WhatsApp Button */}
                        <button
                            onClick={handleInquiry}
                            className="hidden md:block bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20"
                        >
                            Order via WhatsApp
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white hover:text-amber-400"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-neutral-950/98 border-b border-amber-400/20 shadow-2xl py-4 flex flex-col backdrop-blur-xl animate-in slide-in-from-top-2">
                    <div className="px-5 pb-4 mb-2 border-b border-white/10">
                        <SearchBar />
                    </div>
                    <Link
                        href="/"
                        className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-amber-400 hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/#masterpiece-gallery"
                        className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-amber-400 hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Masterpiece Gallery
                    </Link>
                    <Link
                        href="/#collection"
                        className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-amber-400 hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        EDP Catalog
                    </Link>
                    <Link
                        href="/about"
                        className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-amber-400 hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-amber-400 hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <div className="px-6 pt-4 mt-2 border-t border-white/10">
                        <button
                            onClick={handleInquiry}
                            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold py-3 text-center uppercase text-xs tracking-widest rounded-xl shadow-lg"
                        >
                            Order via WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
