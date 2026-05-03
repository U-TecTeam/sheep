import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../mockData';

export type PurchaseType = 'once' | 'subscription';

export interface CartItem {
  product: Product;
  quantity: number;
  purchaseType: PurchaseType;
  frequency?: '2weeks' | '1month';
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, purchaseType: PurchaseType) => void;
  updateQuantity: (productId: string, purchaseType: PurchaseType, quantity: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
  shippingThreshold: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingThreshold: 199,
      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (i) => i.product.id === newItem.product.id && i.purchaseType === newItem.purchaseType
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, newItem] });
        }
      },
      removeItem: (productId, purchaseType) => {
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.purchaseType === purchaseType)
          ),
        });
      },
      updateQuantity: (productId, purchaseType, quantity) => {
        const updatedItems = get().items.map((i) => {
          if (i.product.id === productId && i.purchaseType === purchaseType) {
            return { ...i, quantity };
          }
          return i;
        });
        set({ items: updatedItems });
      },
      clearCart: () => set({ items: [] }),
      totalAmount: () => {
        return get().items.reduce((acc, item) => {
          const price = item.purchaseType === 'subscription' ? item.product.price * 0.9 : item.product.price;
          return acc + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
