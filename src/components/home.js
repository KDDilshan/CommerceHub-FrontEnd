import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section with animated gradient */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Commerce<span className="text-white">Hub</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                The future of e-commerce is here. Manage your digital marketplace with cutting-edge tools and insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 ease-out">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-500 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Browse Products</span>
                </Link>
                <Link to="/register" className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-transparent border-2 border-purple-500 text-white font-medium transition-all duration-300 ease-out hover:bg-purple-500/20">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-500 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Get Started</span>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                {/* 3D-like floating product cards */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-all duration-300"></div>
                <div className="absolute top-8 left-8 w-64 h-64 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-300"></div>
                <div className="absolute top-16 left-16 w-64 h-64 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl shadow-xl transform rotate-12 hover:rotate-0 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-white font-medium mt-4">Your Digital Marketplace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section with glassmorphism */}
      <section className="py-24 relative">
        {/* Background grid pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tMi0xOGMtNC45NzIgMC05IDQuMDI4LTkgOXM0LjAyOCA5IDkgOSA5LTQuMDI4IDktOXMtNC4wMjgtOS05LTl6TTI0IDM4YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTIgNGMtNC45NzIgMC05IDQuMDI4LTkgOXM0LjAyOCA5IDkgOSA5LTQuMDI4IDktOXMtNC4wMjgtOS05LTl6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="inline-block text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Next-Gen Features
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="backdrop-blur-lg bg-white/10 p-8 rounded-3xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-blue-300">AI-Powered Product Management</h3>
              <p className="text-gray-300 text-center">
                Leverage machine learning algorithms to optimize your product listings, pricing, and inventory management.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="backdrop-blur-lg bg-white/10 p-8 rounded-3xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-purple-300">Biometric Authentication</h3>
              <p className="text-gray-300 text-center">
                Secure your account with next-generation biometric verification and multi-factor authentication protocols.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="backdrop-blur-lg bg-white/10 p-8 rounded-3xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-pink-500 to-pink-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-pink-300">Augmented Reality Preview</h3>
              <p className="text-gray-300 text-center">
                Allow customers to visualize products in their space with our cutting-edge AR technology integration.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section with animated counters */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">3M+</div>
              <p className="text-blue-300">Products Listed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">99.9%</div>
              <p className="text-blue-300">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">150+</div>
              <p className="text-blue-300">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <p className="text-blue-300">Support</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials with hover effects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="inline-block text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Trusted by Innovators
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">Alex Chen</h4>
                  <p className="text-blue-300 text-sm">Tech Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "CommerceHub transformed how we manage our e-commerce operations. The AI-powered insights have increased our revenue by 42% in just three months."
              </p>
            </div>
            
            <div className="backdrop-blur-lg bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">Sarah Johnson</h4>
                  <p className="text-purple-300 text-sm">Digital Marketer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The AR product preview feature has reduced our return rate by 67%. Our customers love being able to see products in their space before purchasing."
              </p>
            </div>
            
            <div className="backdrop-blur-lg bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">Michael Okoye</h4>
                  <p className="text-pink-300 text-sm">Global Retailer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Expanding to international markets was seamless with CommerceHub. Their multi-currency and localization features helped us scale to 28 countries in one year."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with animated gradient border */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative max-w-3xl mx-auto">
            {/* Animated border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            
            <div className="relative backdrop-blur-lg bg-black/50 rounded-3xl p-12 border border-white/10">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your E-Commerce?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join the future of digital commerce with our cutting-edge platform. Get started today and see the difference.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/register" className="relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium group">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative">Create Account</span>
                  </Link>
                  <Link to="/login" className="relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-transparent border border-white/50 text-white font-medium group hover:bg-white/5">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative">Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add this CSS to your globals or component styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
};

export default Home;