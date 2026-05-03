'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Post, Product } from '@/lib/mockData';
import { ChevronLeft, Heart, MessageCircle, Share2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTranslations } from 'next-intl';

export default function PostDetail() {
  const t = useTranslations('Post');
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [post, setPost] = useState<Post | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: postsData } = await supabase.from('posts').select('*').eq('id', id).single();
      const { data: productsData } = await supabase.from('products').select('*');
      
      if (postsData) {
        setPost({
          ...postsData,
          author: { name: postsData.author_name, avatar: postsData.author_avatar },
          relatedProductId: postsData.related_product_id
        });
      }

      if (productsData) {
        setProducts(productsData.map(p => ({
          ...p,
          image: p.image_url,
          flavorProfile: p.flavor_profile,
          roastLevel: p.roast_level
        })));
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-300">Loading...</div>;
  if (!post) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-300">Post not found</div>;

  const relatedProduct = products.find(p => p.id === post.relatedProductId);

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black pb-32">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-bold uppercase tracking-widest text-sm">{t('detail_title')}</span>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      <main className="max-w-4xl mx-auto pt-24">
        {/* Images Gallery (Simple) */}
        <div className="px-6 space-y-4">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
            <img src={post.images[0]} alt="Post" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {post.images.slice(1).map((img, i) => (
              <div key={i} className="w-32 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 mt-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full ring-4 ring-gray-50" />
              <div>
                <p className="font-black uppercase tracking-tight">{post.author.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Coffee Master · 2h ago</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
              Follow
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-medium leading-relaxed text-gray-800">
              {post.content}
            </p>
            
            {/* Mock Brewing Params */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('ratio')}</p>
                <p className="font-black">1:15</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('temp')}</p>
                <p className="font-black">92°C</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('method')}</p>
                <p className="font-black">V60</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-gray-400">
            <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
                <Heart size={24} />
              </div>
              <span className="font-black text-black">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                <MessageCircle size={24} />
              </div>
              <span className="font-black text-black">24</span>
            </button>
          </div>

          {/* Comment Section (Placeholder) */}
          <div className="pt-10 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest">{t('comments')}</h3>
            <div className="flex gap-4">
              <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                <Image src="https://i.pravatar.cc/150?u=current" alt="Current User" fill className="object-cover" />
              </div>
              <input 
                type="text" 
                placeholder={t('add_comment')}
                className="flex-1 bg-gray-50 rounded-2xl px-6 outline-none font-medium text-sm focus:ring-2 ring-black/5 transition-all"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Related Product Bar */}
      <AnimatePresence>
        {relatedProduct && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 z-50 rounded-t-[2.5rem] shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-800">
                  <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t('shop_the_look')}</p>
                  <p className="font-bold truncate max-w-[150px] md:max-w-none">{relatedProduct.name}</p>
                </div>
              </div>
              <button 
                onClick={() => router.push(`/product/${relatedProduct.id}`)}
                className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"
              >
                <ShoppingBag size={16} />
                View
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
div>
        )}
      </AnimatePresence>
    </div>
  );
}
