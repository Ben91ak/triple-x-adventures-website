import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GlobalBackground } from '@/components/layout/background-fixed';
import { BlobVideoManager } from '@/components/admin/blob-video-manager';

export default function MediaManagerPage() {
  return (
    <div className="font-opensans text-slate relative">
      <Helmet>
        <title>Media Manager | Triple X Adventures</title>
        <meta name="description" content="Manage media assets for Triple X Adventures" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background with reduced intensity for admin pages */}
      <GlobalBackground intensity="medium" starDensity="sparse" />
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 md:pt-32 pb-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Media Asset Manager</h1>
            
            <div className="max-w-6xl mx-auto">
              <BlobVideoManager />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
