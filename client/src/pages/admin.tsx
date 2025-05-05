import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GlobalBackground } from '@/components/layout/background-fixed';
import { TranslationManager } from '@/components/admin/translation-manager';

export default function AdminPage() {
  return (
    <div className="font-opensans text-slate relative">
      <Helmet>
        <title>Admin Dashboard | Triple X Adventures</title>
        <meta name="description" content="Admin dashboard for Triple X Adventures" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background with reduced intensity for admin pages */}
      <GlobalBackground intensity="medium" starDensity="sparse" />
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 md:pt-32 pb-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Admin Dashboard</h1>
            
            {/* Admin navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link href="/admin">
                <a className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  Translation Manager
                </a>
              </Link>
              <Link href="/admin/media">
                <a className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                  Media Manager
                </a>
              </Link>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <TranslationManager />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
