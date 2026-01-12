import { Hero } from '@/components/Hero';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { CategoryShowcase } from '@/components/CategoryShowcase';

export default function Home() {
    return (
        <main>
            <Hero />
            <FeaturedCarousel />
            <div id="collection">
                <CategoryShowcase />
            </div>
        </main>
    );
}
