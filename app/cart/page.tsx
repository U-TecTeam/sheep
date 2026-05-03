'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import { ShoppingBag, Truck, MapPin, ChevronRight, Package, Coffee, Trash2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, totalAmount, shippingThreshold, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();
  const [addressInput, setAddressInput] = useState('');
  const [parsedAddress, setParsedAddress] = useState<any>(null);
  const total = totalAmount();
  const remainingForFreeShipping = Math.max(0, shippingThreshold - total);
  const progress = Math.min(100, (total / shippingThreshold) * 100);

  const handleParseAddress = () => {
    // Simple mock parsing logic
    const phoneMatch = addressInput.match(/1[3-9]\d{9}/);
    const nameMatch = addressInput.match(/^([\u4e00-\u9fa5]{2,4})/);
    
    if (phoneMatch || nameMatch) {
      setParsedAddress({
        name: nameMatch ? nameMatch[0] : '识别失败',
        phone: phoneMatch ? phoneMatch[0] : '识别失败',
        address: addressInput.replace(phoneMatch ? phoneMatch[0] : '', '').replace(nameMatch ? nameMatch[0] : '', '').trim()
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-['Space_Grotesk'] text-black pb-40">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold uppercase tracking-widest">Shopping Cart</h1>
        <button onClick={() => router.push('/')} className="text-sm font-bold text-gray-400">Close</button>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-10 space-y-10">
        {/* Shipping Progress */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-lg font-bold">全场满 ¥{shippingThreshold} 包邮</h2>
              <p className="text-sm text-gray-400 font-medium">
                {remainingForFreeShipping > 0 
                  ? `还差 ¥${remainingForFreeShipping} 即可享受全国免邮` 
                  : '已满足包邮条件'}
              </p>
            </div>
            <Truck className={remainingForFreeShipping === 0 ? 'text-green-500' : 'text-gray-300'} />
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full transition-all ${remainingForFreeShipping === 0 ? 'bg-black' : 'bg-gray-400'}`}
            />
          </div>
        </section>

        {/* Item List */}
        <section className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
              <ShoppingBag size={48} className="mx-auto text-gray-200" />
              <p className="text-gray-400 font-bold">购物车空空如也</p>
              <button onClick={() => router.push('/')} className="text-sm font-bold underline underline-offset-4">去逛逛</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.purchaseType}`} className="bg-white p-6 rounded-[2rem] shadow-sm flex gap-6 items-center">
                <img src={item.product.image} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold truncate">{item.product.name}</h3>
                    <button 
                      onClick={() => removeItem(item.product.id, item.purchaseType)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
                    {item.purchaseType === 'subscription' ? `周期订阅 (${item.frequency === '1month' ? '每月' : '每2周'})` : '单次购买'}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-black text-lg">¥{item.purchaseType === 'subscription' ? Math.round(item.product.price * 0.9) : item.product.price}</p>
                    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl">
                      <button onClick={() => updateQuantity(item.product.id, item.purchaseType, Math.max(1, item.quantity - 1))} className="font-bold text-gray-400">-</button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.purchaseType, item.quantity + 1)} className="font-bold text-gray-400">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Address Parsing */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">智能地址解析</h2>
          </div>
          <div className="space-y-4">
            <textarea 
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="粘贴完整收件信息：例如：张三，13800138000，北京市海淀区..."
              className="w-full h-32 p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none transition-all text-sm font-medium"
            />
            <button 
              onClick={handleParseAddress}
              className="px-6 py-3 bg-gray-100 hover:bg-black hover:text-white rounded-full text-xs font-bold transition-all uppercase tracking-widest"
            >
              一键解析
            </button>
          </div>

          {parsedAddress && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4"
            >
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">收件人</p>
                <p className="font-bold">{parsedAddress.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">电话</p>
                <p className="font-bold">{parsedAddress.phone}</p>
              </div>
              <div className="col-span-2 space-y-1 border-t border-gray-200 pt-3">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">详细地址</p>
                <p className="font-bold">{parsedAddress.address}</p>
              </div>
            </motion.div>
          )}
        </section>

        {/* Logistics Mock (Only if items present) */}
        {items.length > 0 && (
          <section className="bg-black text-white p-8 rounded-[2.5rem] space-y-8 shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-gray-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">最近订单轨迹</h2>
              </div>
              <span className="text-[10px] font-bold bg-white text-black px-2 py-1 rounded">运送中</span>
            </div>
            
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-800">
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center relative z-10 shrink-0">
                  <CheckCircle2 size={14} className="text-black" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">包裹已签收</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">2025.05.03 14:20</p>
                </div>
              </div>
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center relative z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">正在派送中 - 北京海淀中关村分部</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">2025.05.03 09:15</p>
                </div>
              </div>
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center relative z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Coffee size={12} className="text-orange-400" />
                    <p className="text-sm font-bold">烘焙工坊已发货 - 昆明主理人新鲜烘焙</p>
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">2025.05.01 18:00</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Checkout */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-50 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Amount</p>
            <p className="text-3xl font-black">¥{total}</p>
          </div>
          <button 
            disabled={items.length === 0}
            className="px-12 py-5 bg-black text-white rounded-full font-bold shadow-2xl hover:bg-gray-800 transition-all disabled:opacity-30 disabled:grayscale flex items-center gap-2"
          >
            结算订单
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
