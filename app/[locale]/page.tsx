'use client';

import React from 'react';
import { ShoppingCart as CartIcon, User as UserIcon, Search, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { TasteTestDialog } from '@/components/TasteTestDialog';
import { CommunityFeed } from '@/components/CommunityFeed';
import { AuthDialog } from '@/components/AuthDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Home() {
  const t = useTranslations();
  const items = useCartStore(state => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();
  
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      setIsAuthOpen(true);
    }
  };

  const tags = [
    { key: 'all', label: t('Home.tags.all') },
    { key: 'recipes', label: t('Home.tags.recipes') },
    { key: 'reviews', label: t('Home.tags.reviews') },
    { key: 'unboxing', label: t('Home.tags.unboxing') },
    { key: 'tutorials', label: t('Home.tags.tutorials') },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-['Space_Grotesk'] text-black pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter">COFFEE.SOCIAL</div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="text-black border-b-2 border-black pb-1">{t('Navigation.discovery')}</a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors pb-1">{t('Navigation.market')}</a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors pb-1">{t('Navigation.subscription')}</a>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-black transition-colors">
              <Search size={22} />
            </button>
            <button 
              onClick={() => router.push('/cart')}
              className="text-gray-400 hover:text-black transition-colors relative"
            >
              <CartIcon size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleProfileClick}
              className="text-gray-400 hover:text-black transition-colors flex items-center gap-2"
            >
              <UserIcon size={22} />
              {user && <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded">{t('Navigation.online')}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <header className="mb-12 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full w-fit text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} />
            {t('Home.personalized')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]"
          >
            {t.rich('Home.hero_title', {
              spanTag: (chunks) => <span className="text-gray-300">{chunks}</span>,
              br: () => <br />
            })}
       
          </motion.h1>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {tags.map((tag, i) => (
              <button 
                key={tag.key} 
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border-2 transition-all whitespace-nowrap ${i === 0 ? 'bg-black text-white border-black' : 'border-gray-100 hover:border-black'}`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </header>

        {/* Content Feed */}
        <CommunityFeed />
      </main>

      {/* Onboarding & Auth Dialogs */}
      <TasteTestDialog />
      <AnimatePresence>
        {isAuthOpen && <AuthDialog isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
