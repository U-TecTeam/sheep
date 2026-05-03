'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockProducts } from '@/lib/mockData';
import { FlavorRadar } from '@/components/FlavorRadar';
import { ChevronLeft, Info, Calendar, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { motion } from 'framer-motion';

const grindSizes = [
  { id: 'whole', label: '咖啡原豆', desc: '不研磨', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100' },
  { id: 'coarse', label: '法压壶', desc: '粗研磨', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=101' },
  { id: 'medium', label: '手冲/滴滤', desc: '中度研磨', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=102' },
  { id: 'fine', label: '意式浓缩', desc: '极细研磨', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=103' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const product = mockProducts.find(p => p.id === id);
  const addItem = useCartStore(state => state.addItem);

  const [purchaseType, setPurchaseType] = useState<'once' | 'subscription'>('once');
  const [selectedGrind, setSelectedGrind] = useState('whole');
  const [frequency, setFrequency] = useState<'2weeks' | '1month'>('1month');

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
      purchaseType,
      frequency: purchaseType === 'subscription' ? frequency : undefined
    });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black pb-32">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-bold uppercase tracking-widest text-sm">Product Detail</span>
        <div className="w-10" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-24 grid lg:grid-cols-2 gap-12">
        {/* Left: Images & Info */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{product.name}</h1>
            <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Roast Level</span>
              <p className="font-bold text-lg capitalize">{product.roastLevel}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Process</span>
              <p className="font-bold text-lg capitalize">{product.process}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info size={16} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Flavor Profile</h2>
            </div>
            <FlavorRadar data={product.flavorProfile} />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="lg:sticky lg:top-24 h-fit space-y-10">
          {/* Purchase Type Selector */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-2 bg-gray-100 rounded-[2rem]">
              <button 
                onClick={() => setPurchaseType('once')}
                className={`py-6 rounded-[1.5rem] text-sm font-bold transition-all flex flex-col items-center gap-1 ${purchaseType === 'once' ? 'bg-white shadow-xl text-black' : 'text-gray-400'}`}
              >
                <ShoppingBag size={20} />
                单次购买
                <span className="text-[10px] opacity-60">¥{product.price}</span>
              </button>
              <button 
                onClick={() => setPurchaseType('subscription')}
                className={`py-6 rounded-[1.5rem] text-sm font-bold transition-all flex flex-col items-center gap-1 ${purchaseType === 'subscription' ? 'bg-white shadow-xl text-black' : 'text-gray-400'}`}
              >
                <Calendar size={20} />
                周期订阅
                <span className="text-[10px] text-green-600">¥{Math.round(product.price * 0.9)} (-10%)</span>
              </button>
            </div>
          </div>

          {purchaseType === 'subscription' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-8 bg-black text-white rounded-[2.5rem] space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Delivery Frequency</h3>
              </div>
              <div className="flex gap-4">
                {[
                  { id: '2weeks', label: '每 2 周' },
                  { id: '1month', label: '每 1 个月' }
                ].map(freq => (
                  <button 
                    key={freq.id}
                    onClick={() => setFrequency(freq.id as any)}
                    className={`flex-1 py-4 rounded-2xl border-2 transition-all font-bold text-sm ${frequency === freq.id ? 'bg-white text-black border-white' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Grind Size Selector */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest">Select Grind Size</h3>
              <button className="text-xs font-bold text-gray-400 hover:text-black flex items-center gap-1 underline underline-offset-4">
                研磨指南
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {grindSizes.map(size => (
                <button 
                  key={size.id}
                  onClick={() => setSelectedGrind(size.id)}
                  className={`p-4 rounded-[1.5rem] border-2 text-left transition-all flex items-center gap-4 ${selectedGrind === size.id ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden grayscale">
                    <img src={size.img} alt={size.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-tight">{size.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{size.desc}</p>
                  </div>
                  {selectedGrind === size.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full py-6 bg-black text-white rounded-full font-bold text-lg shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <PlusIcon />
            {purchaseType === 'subscription' ? '开启订阅' : '加入购物车'}
          </button>
        </div>
      </main>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black">
      <Plus size={16} />
    </div>
  );
}

function Plus({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
