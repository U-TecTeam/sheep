export type Product = {
  id: number;
  name: string;
  price: number;
  desc: string;
};

export const products: Product[] = [
  { id: 1, name: '美利奴羊毛围巾', price: 199, desc: '柔软保暖，适合秋冬搭配。' },
  { id: 2, name: '羊毛混纺针织帽', price: 129, desc: '轻量亲肤，日常出街百搭。' },
  { id: 3, name: '羊毛家居毯', price: 299, desc: '细腻触感，提升居家舒适度。' },
];
