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

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  purchaseType: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  shipping_address: ShippingAddress;
  created_at: string;
  updated_at: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe G1',
    description: '一款极致纯净的浅烘咖啡。带有强烈的茉莉花香、柠檬酸质以及清爽的红茶感。适合手冲或冰滴，展现埃塞俄比亚高海拔产区的独特风味。',
    price: 128,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop',
    flavorProfile: { acid: 9, body: 3, sweet: 7, bitter: 1, aroma: 10 },
    roastLevel: 'light',
    process: 'washed',
    tags: ['floral', 'citrus', 'tea-like'],
  },
  {
    id: '2',
    name: 'Colombia Huila Supremo',
    description: '中度烘焙带来的平衡之作。焦糖般的甜感融合了微妙的核果酸质，尾韵带有坚果和黑巧克力的香气。是一款极其全能的豆子，无论是美式还是拿铁都表现出色。',
    price: 98,
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1974&auto=format&fit=crop',
    flavorProfile: { acid: 5, body: 6, sweet: 8, bitter: 3, aroma: 7 },
    roastLevel: 'medium',
    process: 'washed',
    tags: ['caramel', 'nutty', 'balanced'],
  },
  {
    id: '3',
    name: 'Brazil Santos NY2',
    description: '深烘爱好者的首选。低酸质，极高醇厚度。风味主调为黑巧克力和烤花生，口感浓郁、顺滑。非常适合搭配牛奶，制作出一杯完美的意式浓缩。',
    price: 88,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961&auto=format&fit=crop',
    flavorProfile: { acid: 2, body: 9, sweet: 6, bitter: 5, aroma: 5 },
    roastLevel: 'dark',
    process: 'natural',
    tags: ['chocolate', 'bold', 'smooth'],
  },
  {
    id: '4',
    name: 'Sumatra Mandheling G1',
    description: '经典的半水洗处理法带来了独特的草本和泥土芳香。中深烘焙度，带有肉桂和甘草的香气，酸度极低，回甘悠长。',
    price: 115,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop',
    flavorProfile: { acid: 3, body: 8, sweet: 7, bitter: 4, aroma: 6 },
    roastLevel: 'medium',
    process: 'honey',
    tags: ['herbal', 'earthy', 'spicy'],
  },
  {
    id: '5',
    name: 'Costa Rica Tarrazu',
    description: '蜜处理赋予了它丰富的蜂蜜与红糖般的甜感。在浅中烘焙下，依然保留了优雅的明亮酸质和丝滑的质感。',
    price: 135,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    flavorProfile: { acid: 6, body: 5, sweet: 10, bitter: 2, aroma: 8 },
    roastLevel: 'light',
    process: 'honey',
    tags: ['honey', 'syrupy', 'clean'],
  },
  {
    id: '6',
    name: 'Kenya AA Plus',
    description: '以极致的酸度而闻名。复杂的黑莓和红醋栗风味，如酒一般的质感。是追求味觉刺激与层次感的资深饮家首选。',
    price: 158,
    image: 'https://images.unsplash.com/photo-1524350303351-806088de2ead?q=80&w=1974&auto=format&fit=crop',
    flavorProfile: { acid: 10, body: 4, sweet: 6, bitter: 2, aroma: 9 },
    roastLevel: 'light',
    process: 'washed',
    tags: ['berry', 'winey', 'complex'],
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
