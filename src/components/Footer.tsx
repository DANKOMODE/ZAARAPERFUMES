import Link from 'next/link';
import { Instagram } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-neutral-950 text-white/90 border-t border-amber-400/20">
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-6 group">
                            <div className="relative w-14 h-14 bg-neutral-900 rounded-2xl p-1.5 shadow-xl border border-amber-400/30 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src="/images/logo.png"
                                    alt="ZAARA Logo"
                                    fill
                                    className="object-contain rounded-xl"
                                />
                            </div>
                            <h3 className="text-2xl font-serif font-bold tracking-widest text-amber-400">
                                ZAARA PERFUMES
                            </h3>
                        </div>
                        <p className="mb-6 max-w-sm text-sm leading-relaxed text-neutral-400 font-light">
                            Premium Eau de Parfum collection inspired by world-renowned scents. Crafted for long-lasting luxury.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-amber-400">
                            Explore
                        </h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                            <li><Link href="/#collection" className="hover:text-amber-400 transition-colors">Catalogue</Link></li>
                            <li><Link href="/search" className="hover:text-amber-400 transition-colors">Search</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-amber-400">
                            Connect
                        </h4>
                        <div className="mb-6 flex space-x-4">
                            <a
                                href="https://www.instagram.com/zaara_perfume_?igsh=cml5cjF4aTB2NGpv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-neutral-900 border border-amber-400/30 rounded-xl text-neutral-400 hover:text-amber-400 hover:border-amber-400 transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                        <a href="tel:+971588978103" className="flex items-center gap-2 text-sm text-neutral-300 hover:text-amber-400 transition-colors mb-2 font-medium">
                            +971 58 897 8103
                        </a>
                        <p className="text-xs text-neutral-500">United Arab Emirates</p>
                    </div>

                </div>

                <div className="mt-16 border-t border-amber-400/10 pt-8 text-center text-xs text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} ZAARA Perfumes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
