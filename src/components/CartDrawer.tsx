"use client";

import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, MessageCircle, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleWhatsApp = () => {
        // 1. Format the message
        let message = "Hello Zaara Perfumes, I am interested in ordering the following collection:\n\n";

        items.forEach(item => {
            message += `• ${item.quantity}x ${item.product.name} (${item.selectedVariant.category} - ${item.selectedVariant.size}) - AED ${item.selectedVariant.price * item.quantity}\n`;
        });

        message += `\nTotal Estimate: AED ${totalPrice.toFixed(2)}`;

        // 2. Encode for URL
        const encodedMessage = encodeURIComponent(message);

        // 3. Open WhatsApp
        window.open(`https://wa.me/971588978103?text=${encodedMessage}`, '_blank');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-neutral-950 border-l border-amber-400/20 text-white z-[70] shadow-2xl shadow-amber-950/40 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-amber-400/10 bg-neutral-900/50">
                    <h2 className="text-xl font-serif text-amber-400 tracking-wide flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-amber-400" /> Your Luxury Cart
                    </h2>
                    <button onClick={closeCart} className="p-2 hover:bg-amber-400/10 rounded-full transition-colors text-neutral-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-500">
                            <ShoppingBag className="w-16 h-16 text-amber-400/40 stroke-1" />
                            <p className="text-lg font-serif text-neutral-400">Your shopping bag is empty</p>
                            <p className="text-xs text-neutral-500 max-w-xs">Explore our Eau de Parfum collection to discover your signature fragrance.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.product.id}-${item.selectedVariant.size}-${item.selectedVariant.category}`} className="flex gap-4 bg-neutral-900/80 border border-amber-400/20 p-4 rounded-xl shadow-lg">
                                <div className="relative w-20 h-24 bg-neutral-950 rounded-lg overflow-hidden border border-amber-400/20 flex-shrink-0">
                                    <Image
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-amber-400 font-medium text-lg leading-tight">{item.product.name}</h3>
                                    <p className="text-xs text-neutral-400 mt-1">{item.selectedVariant.category} • {item.selectedVariant.size}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="flex items-center gap-2 border border-amber-400/30 rounded-lg overflow-hidden bg-neutral-950">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.selectedVariant.size, item.selectedVariant.category, item.quantity - 1)}
                                                className="p-2 text-amber-400 hover:bg-amber-400/10 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.selectedVariant.size, item.selectedVariant.category, item.quantity + 1)}
                                                className="p-2 text-amber-400 hover:bg-amber-400/10 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <span className="text-sm font-bold text-amber-400">
                                            AED {(item.selectedVariant.price * item.quantity).toFixed(2)}
                                        </span>

                                        <button
                                            onClick={() => removeFromCart(item.product.id, item.selectedVariant.size, item.selectedVariant.category)}
                                            className="ml-auto text-xs text-rose-400 hover:text-rose-300 underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-amber-400/20 bg-neutral-900/90 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs uppercase tracking-widest text-neutral-400">Total Estimate</span>
                            <span className="text-2xl font-serif font-bold text-amber-400">AED {totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleWhatsApp}
                            className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 hover:bg-emerald-500 transition-colors font-semibold tracking-wide shadow-lg shadow-emerald-950/50"
                        >
                            <MessageCircle className="w-5 h-5 fill-current" />
                            Order via WhatsApp
                        </button>
                        <p className="text-[11px] text-center mt-3 text-neutral-500">
                            Fast dispatch across UAE. Order confirmed directly via WhatsApp.
                        </p>
                    </div>
                )}

            </div>
        </>
    );
}
