export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  flavorProfile: {
    acid: number;
    body: number;
    sweet: number;
    bitter: number;
    aroma: number;
  };
  roastLevel: 'light' | 'medium' | 'dark';
  process: 'washed' | 'natural' | 'honey';
  tags: string[];
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  images: string[];
  likes: number;
  relatedProductId?: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    description: 'Floral and citrus notes with a tea-like body.',
    price: 128,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop',
    flavorProfile: { acid: 8, body: 4, sweet: 7, bitter: 2, aroma: 9 },
    roastLevel: 'light',
    process: 'washed',
    tags: ['floral', 'citrus', 'clean'],
  },
  {
    id: '2',
    name: 'Colombia Huila',
    description: 'Balanced with caramel sweetness and nutty undertones.',
    price: 98,
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1974&auto=format&fit=crop',
    flavorProfile: { acid: 5, body: 6, sweet: 8, bitter: 3, aroma: 6 },
    roastLevel: 'medium',
    process: 'washed',
    tags: ['caramel', 'nutty', 'balanced'],
  },
  {
    id: '3',
    name: 'Brazil Santos',
    description: 'Low acidity, heavy body with chocolate and roasted peanut notes.',
    price: 88,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961&auto=format&fit=crop',
    flavorProfile: { acid: 2, body: 8, sweet: 6, bitter: 4, aroma: 5 },
    roastLevel: 'dark',
    process: 'natural',
    tags: ['chocolate', 'nutty', 'bold'],
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: { name: 'BrewMaster Jack', avatar: 'https://i.pravatar.cc/150?u=jack' },
    content: 'Today I tried the new Yirgacheffe with a Hario V60. The floral notes are incredible! 92°C water, 1:15 ratio.',
    images: ['https://images.unsplash.com/photo-1544787210-2213d2492f11?q=80&w=2070&auto=format&fit=crop'],
    likes: 124,
    relatedProductId: '1',
  },
  {
    id: 'p2',
    author: { name: 'Coffee Lover Lily', avatar: 'https://i.pravatar.cc/150?u=lily' },
    content: 'Unboxing the subscription box this month. The Brazil Santos is perfect for my morning espresso.',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'],
    likes: 89,
    relatedProductId: '3',
  },
];
