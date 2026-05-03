'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Camera, Thermometer, Timer, Coffee, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function BrewingNoteEditor() {
  const t = useTranslations('Profile');
  const tPost = useTranslations('Post');
  const router = useRouter();
  
  const [content, setContent] = useState('');
  const [temp, setTemp] = useState(92);
  const [ratio, setRatio] = useState(15);
  const [method, setMethod] = useState('V60');
  const [loading, setLoading] = useState(false);

  const methods = ['V60', 'Chemex', 'French Press', 'Aeropress', 'Espresso'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('posts').insert({
        author_id: user?.id,
        author_name: user?.user_metadata?.full_name || 'Coffee Lover',
        author_avatar: user?.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=' + user?.id,
        content,
        images: ['https://images.unsplash.com/photo-1544787210-2213d2492f11?q=80&w=2070&auto=format&fit=crop'], // Mock image
        likes: 0,
        // Optional: brew_params: { temp, ratio, method }
      });

      if (error) throw error;
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Failed to post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black pb-20">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-bold uppercase tracking-widest text-sm">{t('inspiration_title')}</span>
        <div className="w-10" />
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-24 space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Image Upload Placeholder */}
          <div className="aspect-square rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 group hover:border-black transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera size={32} className="text-gray-300 group-hover:text-black transition-colors" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Add Photos</p>
          </div>

          {/* Content Area */}
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your brewing experience, flavor notes, or tips..."
            className="w-full h-40 text-xl font-medium outline-none resize-none placeholder:text-gray-200"
            required
          />

          {/* Brewing Parameters */}
          <section className="space-y-8 p-8 bg-gray-50 rounded-[2.5rem]">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Coffee size={16} />
              {tPost('brewing_params')}
            </h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Thermometer size={14} />
                    {tPost('temp')}
                  </p>
                  <span className="text-xl font-black">{temp}°C</span>
                </div>
                <input 
                  type="range" min="80" max="100" 
                  value={temp} onChange={(e) => setTemp(parseInt(e.target.value))}
                  className="w-full accent-black h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Timer size={14} />
                    {tPost('ratio')}
                  </p>
                  <span className="text-xl font-black">1:{ratio}</span>
                </div>
                <input 
                  type="range" min="10" max="20" 
                  value={ratio} onChange={(e) => setRatio(parseInt(e.target.value))}
                  className="w-full accent-black h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Coffee size={14} />
                  {tPost('method')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {methods.map(m => (
                    <button 
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${method === m ? 'bg-black text-white' : 'bg-white text-gray-400 border border-gray-100 hover:border-black hover:text-black'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-black text-white rounded-full font-bold text-lg shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            {loading ? 'POSTING...' : 'PUBLISH NOTE'}
          </button>
        </form>
      </main>
    </div>
  );
}
