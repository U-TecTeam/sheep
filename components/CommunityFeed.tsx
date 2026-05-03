'use client';

import React, { useState, useEffect } from 'react';
import { Product, Post } from '../lib/mockData';
import { Heart, MessageCircle, ShoppingBag, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../lib/store/useCartStore';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useTranslations } from 'next-intl';

export const CommunityFeed = () => {
  const t = useTranslations('Community');
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: postsData } = await supabase.from('posts').select('*');
      const { data: productsData } = await supabase.from('products').select('*');
      
      // Transform Supabase data to match our UI interfaces
      if (productsData) {
        setProducts(productsData.map(p => ({
          ...p,
          image: p.image_url,
          flavorProfile: p.flavor_profile,
          roastLevel: p.roast_level
        })));
      }

      if (postsData) {
        setPosts(postsData.map(p => ({
          ...p,
          author: { name: p.author_name, avatar: p.author_avatar },
          relatedProductId: p.related_product_id
        })));
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center font-bold text-gray-300">{t('loading')}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} allProducts={products} />
      ))}
    </div>
  );
};

const PostCard = ({ post, allProducts }: { post: Post, allProducts: Product[] }) => {
  const t = useTranslations('Community');
  const router = useRouter();
  const [showSKU, setShowSKU] = useState(false);
  const relatedProduct = allProducts.find(p => p.id === post.relatedProductId);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={post.images[0]} alt="Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {/* Quick Buy Overlay */}
        {relatedProduct && (
          <div className="absolute bottom-4 left-4 right-4" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setShowSKU(true)}
                className="w-full bg-white/90 backdrop-blur-md text-black py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:bg-black hover:text-white transition-all"
              >
                <ShoppingBag size={18} />
                {t('buy_now', { name: relatedProduct.name })}
              </button>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-4">
        <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed font-medium">
          {post.content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <img src={post.author.avatar} alt={post.author.name} className="object-cover fill" />
            </div>
            <span className="text-xs font-bold text-gray-900">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Heart size={16} />
              <span className="text-xs font-medium">{post.likes}</span>
            </button>
            <button className="hover:text-black transition-colors">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSKU && relatedProduct && (
          <SKUModal product={relatedProduct} onClose={() => setShowSKU(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const SKUModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const t = useTranslations('Community');
  const addItem = useCartStore(state => state.addItem);
  const [purchaseType, setPurchaseType] = useState<'once' | 'subscription'>('once');

  const handleAdd = () => {
    addItem({
      product,
      quantity: 1,
      purchaseType,
      frequency: purchaseType === 'subscription' ? '1month' : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ y: "100%" }} 
        animate={{ y: 0 }} 
        exit={{ y: "100%" }}
        className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 relative z-10 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <X size={20} />
        </button>

        <div className="flex gap-6 mb-8">
          <img src={product.image} alt={product.name} className="w-24 h-24 rounded-2xl object-cover shadow-md" />
          <div className="flex-1 pt-2">
            <h3 className="text-xl font-bold mb-1">{product.name}</h3>
            <p className="text-2xl font-black">¥{purchaseType === 'subscription' ? Math.round(product.price * 0.9) : product.price}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-2xl">
            <button 
              onClick={() => setPurchaseType('once')}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${purchaseType === 'once' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
            >
              {t('once')}
            </button>
            <button 
              onClick={() => setPurchaseType('subscription')}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${purchaseType === 'subscription' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
            >
              {t('subscription')}
            </button>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full bg-black text-white py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98]"
          >
            <Plus size={20} />
            {t('add_to_cart')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
