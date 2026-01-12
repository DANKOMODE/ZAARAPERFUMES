import { MapPin, Calendar, Award, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-accent/10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-accent/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-primary/20 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="relative w-28 h-28 mx-auto mb-8 bg-white rounded-3xl p-2 shadow-2xl border border-brand-accent/20 animate-bounce-slow">
                        <Image
                            src="/images/logo.png"
                            alt="ZAARA Logo"
                            fill
                            className="object-contain rounded-2xl"
                        />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-primary mb-4">
                        About ZAARA
                    </h1>
                    <p className="text-lg text-brand-primary/70 max-w-2xl mx-auto">
                        Empowering businesses with premium fragrance oils since 2021
                    </p>
                    <div className="h-1 w-20 bg-brand-accent mx-auto mt-8" />
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-6">
                            Our Mission
                        </h2>
                        <p className="text-lg text-brand-primary/70 leading-relaxed">
                            To inspire businesses worldwide by delivering exceptional fragrance concentrates that
                            capture the essence of luxury. We believe every entrepreneur deserves access to premium
                            quality oils that transform their vision into reality—one drop at a time.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="text-center p-6 bg-brand-light/20 rounded-sm">
                            <Calendar className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-brand-primary mb-2">2021</h3>
                            <p className="text-brand-primary/60">Founded</p>
                        </div>
                        <div className="text-center p-6 bg-brand-light/20 rounded-sm">
                            <Award className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-brand-primary mb-2">1600+</h3>
                            <p className="text-brand-primary/60">Fragrance Oils</p>
                        </div>
                        <div className="text-center p-6 bg-brand-light/20 rounded-sm">
                            <Users className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                            <h3 className="text-3xl font-bold text-brand-primary mb-2">100%</h3>
                            <p className="text-brand-primary/60">Wholesale Focus</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-20 bg-brand-primary/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-12 text-center">
                        What Makes ZAARA Different
                    </h2>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-brand-accent">
                            <h3 className="text-xl font-serif font-bold text-brand-primary mb-3">
                                Unmatched Variety
                            </h3>
                            <p className="text-brand-primary/70">
                                With over 1600 fragrance oils inspired by world-renowned brands, we offer one of the
                                most comprehensive catalogs in the region. From economy to identical-grade concentrates,
                                we cater to every business need and budget.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-brand-accent">
                            <h3 className="text-xl font-serif font-bold text-brand-primary mb-3">
                                Three-Tier Quality System
                            </h3>
                            <p className="text-brand-primary/70">
                                Our unique classification—Economy, Inspired, and Identical—gives you complete
                                transparency and control. Choose the quality level that matches your market positioning
                                and profit margins.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-brand-accent">
                            <h3 className="text-xl font-serif font-bold text-brand-primary mb-3">
                                B2B Excellence
                            </h3>
                            <p className="text-brand-primary/70">
                                We're built for wholesalers, distributors, and perfume manufacturers. Competitive bulk
                                pricing, flexible order quantities, and dedicated business support ensure your success
                                is our priority.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-brand-accent">
                            <h3 className="text-xl font-serif font-bold text-brand-primary mb-3">
                                Strategic Dubai Location
                            </h3>
                            <p className="text-brand-primary/70">
                                Located in the heart of Deira's perfume district, we're at the crossroads of global
                                fragrance trade. Easy access for local pickups and efficient international shipping
                                to serve customers worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-12 text-center">
                        Visit Our Showroom
                    </h2>

                    <div className="bg-brand-light/20 p-8 rounded-sm text-center">
                        <MapPin className="w-12 h-12 text-brand-accent mx-auto mb-4" />
                        <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">
                            ZAARA Perfumes
                        </h3>
                        <p className="text-brand-primary/70 mb-6">
                            Naif Road, Deira<br />
                            Dubai, UAE
                        </p>
                        <a
                            href="https://maps.app.goo.gl/GvHRxvZspny1XXd36"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border-2 border-brand-primary px-8 py-3 text-sm font-medium tracking-widest text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                        >
                            VIEW ON MAP
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                        Ready to Partner With ZAARA?
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Join hundreds of successful businesses who trust ZAARA for their fragrance oil needs.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-brand-primary px-8 py-4 text-sm font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                    >
                        GET IN TOUCH
                    </a>
                </div>
            </section>
        </div>
    );
}
