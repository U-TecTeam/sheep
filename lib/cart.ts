import type { Product } from './products';

export const calcSubtotal = (items: Product[]) => items.reduce((sum, item) => sum + item.price, 0);

export const calcShipping = (subtotal: number) => (subtotal > 300 ? 0 : 20);

export const calcTotal = (items: Product[]) => {
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
};
