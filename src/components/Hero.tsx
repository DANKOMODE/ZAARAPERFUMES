export function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-primary/5">
            {/* Background with abstract elegant shape or nice gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-accent/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-primary/10 to-transparent" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <h2 className="mb-4 text-sm font-medium tracking-[0.2em] text-brand-accent uppercase">
                    Welcome to Zaara
                </h2>
                <h1 className="mb-6 text-5xl md:text-7xl font-serif text-brand-primary">
                    Premium Fragrance Oils
                </h1>
                <p className="mx-auto mb-10 max-w-lg text-lg text-brand-primary/70 font-light leading-relaxed">
                    Wholesale perfume concentrates and fragrance oils inspired by world-renowned brands. Perfect for bulk orders.
                </p>
                <a
                    href="#collection"
                    className="inline-block border border-brand-primary px-8 py-3 text-sm font-medium tracking-widest text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                    BROWSE CATALOG
                </a>
            </div>
        </section>
    );
}
