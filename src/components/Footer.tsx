import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-brand-dark text-white/90">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-6 group">
                            <div className="relative w-16 h-16 bg-white rounded-2xl p-1.5 shadow-lg border border-white/10 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src="/images/logo.png"
                                    alt="ZAARA Logo"
                                    fill
                                    className="object-contain rounded-xl"
                                />
                            </div>
                            <h3 className="text-2xl font-serif font-bold tracking-widest text-white group-hover:text-brand-accent transition-colors">
                                ZAARA PERFUMES
                            </h3>
                        </div>
                        <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
                            Wholesale fragrance oils inspired by world-renowned brands. Serving businesses worldwide since 2021.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-accent">
                            Explore
                        </h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/collection/classics" className="hover:text-white transition-colors">Classics</Link></li>
                            <li><Link href="/collection/signature" className="hover:text-white transition-colors">Signature</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-accent">
                            Connect
                        </h4>
                        <div className="mb-6 flex space-x-4">
                            <a href="https://www.instagram.com/zaara_perfume_?igsh=cml5cjF4aTB2NGpv" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                        <a href="tel:+971588978103" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-2">
                            +971 58 897 8103
                        </a>
                        <p className="text-xs text-white/40">Email coming soon</p>
                    </div>

                </div>

                <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/40">
                    <p>&copy; 2024 ZAARA Perfumes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
