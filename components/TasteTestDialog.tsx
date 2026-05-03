'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore, TasteProfile } from '../lib/store/useUserStore';
import { Coffee, CheckCircle2, X } from 'lucide-react';

const questions = [
  {
    id: 'fruit',
    title: '您喜欢哪种水果的甜感？',
    options: [
      { label: '柑橘/柠檬 (偏酸)', value: 8, key: 'acid' },
      { label: '浆果/草莓 (均衡)', value: 5, key: 'acid' },
      { label: '葡萄/巧克力 (偏甜)', value: 2, key: 'acid' },
    ],
  },
  {
    id: 'body',
    title: '您更倾向于什么样的口感？',
    options: [
      { label: '像茶一样清爽', value: 3, key: 'body' },
      { label: '丝滑顺口', value: 5, key: 'body' },
      { label: '像红酒或热可可一样厚重', value: 8, key: 'body' },
    ],
  },
  {
    id: 'roast',
    title: '您平时的烘焙偏好是？',
    options: [
      { label: '浅烘 (保留原产地花果香)', value: 'light', key: 'roast' },
      { label: '中烘 (均衡的坚果巧克力感)', value: 'medium', key: 'roast' },
      { label: '深烘 (醇厚微苦，无酸)', value: 'dark', key: 'roast' },
    ],
  },
];

export const TasteTestDialog = () => {
  const { hasCompletedOnboarding, completeOnboarding } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<TasteProfile>>({});

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedOnboarding]);

  const handleOptionSelect = (key: string, value: any) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step
      const finalProfile: TasteProfile = {
        acid: newAnswers.acid || 5,
        sweet: 7,
        body: newAnswers.body || 5,
        roast: (newAnswers.roast as any) || 'medium',
      };
      completeOnboarding(finalProfile);
      setTimeout(() => setIsOpen(false), 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {hasCompletedOnboarding ? (
            <div className="text-center py-10 space-y-4">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h2 className="text-2xl font-bold">测试完成！</h2>
              <p className="text-gray-500">已为您生成专属咖啡风味画像，快去发现页看看吧。</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-black text-white p-2 rounded-lg">
                  <Coffee size={20} />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">Taste Test</span>
                <span className="ml-auto text-xs text-gray-400 font-medium">Step {currentStep + 1} of {questions.length}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {questions[currentStep].title}
                  </h2>
                  <div className="space-y-3">
                    {questions[currentStep].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(opt.key, opt.value)}
                        className="w-full p-5 text-left rounded-2xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 transition-all group flex items-center justify-between"
                      >
                        <span className="font-semibold">{opt.label}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-black transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
