'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import { Calendar as CalendarIcon, Package, Share2, Plus, ArrowLeft, Camera, Settings, Coffee, ChevronRight, Truck, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const t = useTranslations('Profile');
  const { items } = useCartStore();
  const router = useRouter();
  const posterRef = useRef<HTMLDivElement>(null);
  const subscriptionItems = items.filter(i => i.purchaseType === 'subscription');

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setOrders(data);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-black text-gray-300">LOADING...</div>;

  const handleConfirmReceipt = async (orderId: string) => {
    const { error } = await supabase.from('orders').update({ status: 'delivered' }).eq('id', orderId);
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'delivered' } : o));
      alert('Enjoy your coffee! Redirecting to share your brew note...');
      router.push('/profile/create-post');
    }
  };

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
        <h1 className="text-sm font-bold uppercase tracking-widest">{t('title')}</h1>
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

        {/* Recent Orders & Logistics */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Package size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Recent Orders</h2>
          </div>
          
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center py-10 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 text-gray-300 font-bold">No orders yet</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order ID: {order.id.slice(0, 8)}</p>
                      <h3 className="text-lg font-black mt-1">Status: {order.status.toUpperCase()}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-black text-white'}`}>
                      {order.status}
                    </span>
                  </div>

                  {order.status === 'shipped' && (
                    <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                      <div className="flex gap-6 relative">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center relative z-10 shrink-0">
                          <Truck size={12} className="text-white" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold">In Transit - Shipped from Yunnan Roastery</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tracking: SF123456789</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleConfirmReceipt(order.id)}
                        className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-gray-800 transition-all"
                      >
                        Confirm Receipt
                      </button>
                    </div>
                  )}

                  {order.status === 'delivered' && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl text-green-600">
                      <CheckCircle2 size={18} />
                      <p className="text-xs font-bold uppercase tracking-widest">Delivered on {new Date(order.updated_at).toLocaleDateString()}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-xs font-bold text-gray-400 mb-2">ITEMS</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item: OrderItem) => (
                        <span key={item.id} className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold">
                          {item.name} x {item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Subscription Calendar */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">{t('calendar')}</h2>
            </div>
          </div>

          {subscriptionItems.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="text-gray-300 font-bold">{t('no_subscriptions')}</p>
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
                    <p className="text-xs font-bold">{t('next_shipment', { date: '5月15日' })}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{subscriptionItems[0].product.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase">{t('skip')}</button>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase">{t('modify')}</button>
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
              <h2 className="text-sm font-bold uppercase tracking-widest">{t('poster_title')}</h2>
            </div>
            <button onClick={downloadPoster} className="text-xs font-bold underline underline-offset-4">{t('save_image')}</button>
          </div>

          <div ref={posterRef} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-sm mx-auto text-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-black rotate-45 translate-x-16 -translate-y-16" />
            
            <div className="space-y-8 relative z-10">
              <div className="text-4xl font-black tracking-tighter leading-none">
                {t.rich('unboxing_moment', {
                  br: () => <br />
                })}
              </div>
              
              <div className="relative aspect-square rounded-2xl overflow-hidden grayscale">
                <Image src={items[0]?.product.image || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"} alt="Poster Product" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">{t('selected_bean')}</p>
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
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('member')}</p>
                  <p className="text-xs font-bold">BREWMASTER JACK</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('date')}</p>
                  <p className="text-xs font-bold">2025.05.03</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brewing Note Editor Trigger */}
        <section className="bg-black text-white p-8 rounded-[2.5rem] flex items-center justify-between shadow-xl">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">{t('inspiration_title')}</h2>
            <p className="text-xs text-gray-400 font-medium">{t('inspiration_desc')}</p>
          </div>
          <button 
            onClick={() => router.push('/profile/create-post')}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Plus size={24} />
          </button>
        </section>
      </main>
    </div>
  );
}
    </section>
      </main>
    </div>
  );
}
   </section>
      </main>
    </div>
  );
}
