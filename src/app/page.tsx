import { Hero } from '@/components/Hero';
import { MasterpieceGallery } from '@/components/MasterpieceGallery';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { CategoryShowcase } from '@/components/CategoryShowcase';

export default function Home() {
    return (
        <main>
            <Hero />
            <MasterpieceGallery />
            <FeaturedCarousel />
            <div id="collection">
                <CategoryShowcase />
            </div>
        </main>
    );
}
