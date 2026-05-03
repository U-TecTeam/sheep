'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function OAuthConsent() {
  const router = useRouter();

  useEffect(() => {
    // Supabase client automatically handles the hash/code in the URL
    // and exchanges it for a session. We just need to check if the session exists
    // and then redirect to the desired page.
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Successful login, redirect to home or profile
        router.push('/');
      } else {
        // If no session found (e.g. error or expired), redirect to home
        router.push('/');
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-center items-center justify-center bg-white font-['Space_Grotesk']">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-bold uppercase tracking-widest text-sm">Authenticating...</p>
      </div>
    </div>
  );
}
