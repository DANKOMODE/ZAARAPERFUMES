import productsData from '@/data/products.json';

export type VariantCategory = 'Economy' | 'Inspired' | 'Identical';

export interface Variant {
    size: string;
    price: number;
    category: VariantCategory;
}

export interface Product {
    id: string;
    originalId: string;
    name: string;
    description: string;
    imageUrl: string;
    collectionTag?: string; // 'Classics' or 'Main'
    notes: {
        top: string;
        heart: string;
        base: string;
    };
    variants: Variant[];
}

export const products: Product[] = productsData as unknown as Product[];
