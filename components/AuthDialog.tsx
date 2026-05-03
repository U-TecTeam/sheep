'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { X, Mail, Lock, Coffee, ArrowRight, Loader2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: Props) => {
  const t = useTranslations('Auth');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert(t('verify_email'));
      }
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/oauth/consent`
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="p-10 md:p-14">
          <div className="text-center space-y-4 mb-10">
            <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto rotate-12">
              <Coffee size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              {isLogin ? t('welcome_back') : t('create_account')}
            </h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              {isLogin ? t('login_desc') : t('signup_desc')}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="email" 
                placeholder={t('email')} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none transition-all font-medium text-sm"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password" 
                placeholder={t('password')} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none transition-all font-medium text-sm"
              />
            </div>

            {error && <p className="text-xs text-red-500 font-bold ml-2">{error}</p>}

            <button 
              disabled={loading}
              className="w-full py-5 bg-black text-white rounded-full font-bold shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  {isLogin ? t('login_btn') : t('signup_btn')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-gray-300 bg-white px-4">{t('or_continue')}</div>
          </div>

          <button 
            onClick={handleGithubLogin}
            className="w-full mt-8 py-4 border-2 border-gray-100 rounded-full flex items-center justify-center gap-3 text-sm font-bold hover:bg-gray-50 transition-all"
          >
            <SiGithub size={20} />
            GITHUB
          </button>

          <p className="text-center mt-10 text-xs font-bold text-gray-400">
            {isLogin ? t('no_account') : t('has_account')}
            <button onClick={() => setIsLogin(!isLogin)} className="text-black underline underline-offset-4 ml-1">
              {isLogin ? t('register_now') : t('return_login')}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
