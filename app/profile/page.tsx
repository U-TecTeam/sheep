'use client';

import React, { useRef } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import { Calendar as CalendarIcon, Package, Share2, Plus, ArrowLeft, Camera, Settings, Coffee, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

export default function ProfilePage() {
  const { items } = useCartStore();
  const router = useRouter();
  const posterRef = useRef<HTMLDivElement>(null);
  const subscriptionItems = items.filter(i => i.purchaseType === 'subscription');

  const downloadPoster = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const link = document.createElement('a');
      link.download = 'coffee-unboxing-poster.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-['Space_Grotesk'] text-black pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-bold uppercase tracking-widest">My Profile</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Settings size={20} />
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-10 space-y-12">
        {/* User Info */}
        <section className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[2rem] bg-black overflow-hidden border-4 border-white shadow-xl">
            <img src="https://i.pravatar.cc/150?u=jack" alt="User" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter">BREWMASTER JACK</h2>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Coffee Enthusiast · Level 4</p>
          </div>
        </section>

        {/* Subscription Calendar */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">订阅日历 (Next Shipments)</h2>
            </div>
          </div>

          {subscriptionItems.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="text-gray-300 font-bold">暂无生效中的周期订阅</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mock Calendar View */}
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-300 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const isShipDay = day === 15 || day === 28;
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all ${isShipDay ? 'bg-black text-white shadow-lg ring-4 ring-black/5' : 'bg-gray-50 text-gray-400'}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-gray-400" />
                  <div>
                    <p className="text-xs font-bold">下一期发货：5月15日</p>
                    <p className="text-[10px] text-gray-400 font-medium">{subscriptionItems[0].product.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase">跳过</button>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase">修改</button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Poster Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">专属开箱海报</h2>
            </div>
            <button onClick={downloadPoster} className="text-xs font-bold underline underline-offset-4">保存图片</button>
          </div>

          <div ref={posterRef} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-sm mx-auto text-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-black rotate-45 translate-x-16 -translate-y-16" />
            
            <div className="space-y-8 relative z-10">
              <div className="text-4xl font-black tracking-tighter leading-none">
                UNBOXING <br />
                MOMENT.
              </div>
              
              <div className="aspect-square rounded-2xl overflow-hidden grayscale">
                <img src={items[0]?.product.image || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"} alt="Poster Product" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">Selected Bean</p>
                    <p className="text-lg font-black">{items[0]?.product.name || "Ethiopia Yirgacheffe"}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Organic</span>
                  <span className="px-3 py-1 bg-gray-100 text-black text-[10px] font-bold uppercase tracking-widest rounded-full">Light Roast</span>
                  <span className="px-3 py-1 bg-gray-100 text-black text-[10px] font-bold uppercase tracking-widest rounded-full">Floral</span>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Member</p>
                  <p className="text-xs font-bold">BREWMASTER JACK</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                  <p className="text-xs font-bold">2025.05.03</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brewing Note Editor Trigger */}
        <section className="bg-black text-white p-8 rounded-[2.5rem] flex items-center justify-between shadow-xl">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">记录你的冲煮灵感</h2>
            <p className="text-xs text-gray-400 font-medium">使用结构化模板，分享粉水比与水温参数</p>
          </div>
          <button className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Plus size={24} />
          </button>
        </section>
      </main>
    </div>
  );
}
