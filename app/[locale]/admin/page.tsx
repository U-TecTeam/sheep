'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  BarChart3, 
  Package, 
  Users, 
  MessageSquare, 
  Plus, 
  Search, 
  TrendingUp, 
  ArrowUpRight,
  MoreVertical,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/mockData';

export default function AdminDashboard() {
  const t = useTranslations('Admin');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: prodData } = await supabase.from('products').select('*');
      const { data: orderData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      
      if (prodData) {
        setProducts(prodData.map(p => ({
          ...p,
          image: p.image_url,
          flavorProfile: p.flavor_profile,
          roastLevel: p.roast_level
        })));
      }
      if (orderData) setOrders(orderData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleShipOrder = async (orderId: string) => {
    const { error } = await supabase.from('orders').update({ status: 'shipped' }).eq('id', orderId);
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'shipped' } : o));
    }
  };

  const stats = [
    { label: t('total_sales'), value: '¥128,430', change: '+12.5%', icon: BarChart3 },
    { label: t('active_subs'), value: '1,240', change: '+8.2%', icon: Users },
    { label: t('trending'), value: 'Yirgacheffe', change: 'Top 1', icon: TrendingUp },
  ];

  if (loading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-black text-gray-300">LOADING...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Space_Grotesk'] text-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-6 space-y-10">
        <div className="text-xl font-black tracking-tighter">SHEEP.ADMIN</div>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', name: t('overview'), icon: LayoutDashboard },
            { id: 'products', name: t('products'), icon: Package },
            { id: 'orders', name: t('orders'), icon: BarChart3 },
            { id: 'posts', name: t('posts'), icon: MessageSquare },
          ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
          >              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Logged in as</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black" />
            <span className="text-xs font-bold">Admin Jack</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 space-y-12 overflow-y-auto">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase">{activeTab}</h1>
            <p className="text-sm text-gray-400 font-medium">Manage your platform resources here.</p>
          </div>
          {activeTab === 'products' && (
            <button className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl">
              <Plus size={16} />
              {t('add_product')}
            </button>
          )}
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-gray-50 rounded-2xl">
                      <stat.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <ArrowUpRight size={10} />
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black mt-1">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-black uppercase tracking-tight">{t('products')}</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-6 py-2 bg-gray-50 rounded-full text-xs font-bold outline-none border-2 border-transparent focus:border-black transition-all"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-8 py-4">Product</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product.id} className="group hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <span className="font-bold text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          {product.tags[0]}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-sm">¥{product.price}</td>
                      <td className="px-8 py-6">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          In Stock
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-white rounded-lg transition-colors text-gray-300 hover:text-black shadow-sm">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'orders' && (
          <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50">
              <h2 className="text-lg font-black uppercase tracking-tight">{t('orders')}</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">User</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="group hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6 font-mono text-xs">{order.id.slice(0, 8)}</td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-sm">{order.user_id.slice(0, 8)}</span>
                      </td>
                      <td className="px-8 py-6 font-black text-sm">¥{order.total_amount}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => handleShipOrder(order.id)}
                            className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
                          >
                            Ship Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
/section>
        )}
      </main>
    </div>
  );
}
