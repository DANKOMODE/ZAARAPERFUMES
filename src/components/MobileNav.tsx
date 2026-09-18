"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function MobileNav() {
    const pathname = usePathname();
    const { totalItems, openCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const navItems = [
        { label: "Home", href: "/", icon: Home },
        { label: "Catalog", href: "/#collection", icon: Compass },
        { label: "Search", href: "/search", icon: Search },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-amber-400/20 py-2 px-3 md:hidden shadow-2xl shadow-amber-950/40">
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
                                isActive
                                    ? "text-amber-400 font-semibold"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                {/* Cart Action Button */}
                <button
                    onClick={openCart}
                    className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                    aria-label="Open Cart Drawer"
                >
                    <div className="relative">
                        <ShoppingBag className="w-5 h-5 text-amber-400" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-amber-400 text-neutral-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <span>Cart</span>
                </button>
            </div>
        </nav>
    );
}
