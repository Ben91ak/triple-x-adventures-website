import React from 'react';
import { TranslationManager } from '@/components/admin/translation-manager';

export default function TranslationsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Translation Management</h1>
        <TranslationManager />
      </div>
    </div>
  );
}
