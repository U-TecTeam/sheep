import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold uppercase tracking-widest">Ulinki</div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-black transition-colors border-b-2 border-transparent hover:border-black">IDENTIFICATION</a>
          <a href="#" className="hover:text-black transition-colors border-b-2 border-transparent hover:border-black">PRODUCTS</a>
          <a href="#" className="hover:text-black transition-colors border-b-2 border-transparent hover:border-black">ABOUT</a>
          <a href="#" className="hover:text-black transition-colors border-b-2 border-transparent hover:border-black">CONTACT</a>
        </nav>
        <button className="bg-black text-white px-6 py-2 text-sm font-bold rounded-full hover:bg-gray-800 transition-all">
          GET STARTED
        </button>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <span className="text-black font-bold tracking-[0.3em] text-xs mb-6 block uppercase opacity-60">
              Identification Result
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight max-w-5xl mx-auto tracking-tighter">
              Master Your Coffee <span className="underline decoration-1 underline-offset-8">Bean</span> Identity
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg font-medium leading-relaxed">
              Explore the unique characteristics of roasted coffee beans with our advanced identification system.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-black text-white px-10 py-5 text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-2xl">
                START SCANNING
              </button>
              <button className="border border-black text-black px-10 py-5 text-sm font-bold rounded-full hover:bg-black hover:text-white transition-all">
                LEARN MORE
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-16">
              <div className="group space-y-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Fast Identification</h3>
                <p className="text-gray-500 leading-relaxed">Get instant results with our high-speed processing engine designed for accuracy.</p>
              </div>
              <div className="group space-y-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 3.89 2.421 7.22 5.824 8.513l.331.13.331-.13c3.403-1.292 5.824-4.624 5.824-8.514 0-1.29-.251-2.527-.713-3.666a11.95 11.95 0 01-5.852-3.332z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Secure Data</h3>
                <p className="text-gray-500 leading-relaxed">Your information is protected with enterprise-grade encryption and privacy controls.</p>
              </div>
              <div className="group space-y-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V19.875c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Deep Analytics</h3>
                <p className="text-gray-500 leading-relaxed">Gain insights into every detail of your product with our comprehensive analytics.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-3xl font-black tracking-tighter">ULINKI</div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Connecting design and technology to provide the best identification solutions for the coffee industry.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Social</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-900 mt-20 pt-10 text-center text-gray-600 text-xs tracking-widest uppercase">
          © 2025 ULINKI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
