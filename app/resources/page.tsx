"use client";

import React, { useState } from 'react';
import { Book, FileText, Music, Download, CreditCard, Lock, CheckCircle } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image'

// --- Types ---
type ResourceType = 'book' | 'journal' | 'hymnal';

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  author: string;
  price: number; // Price in your currency (e.g., USD, NGN)
  description: string;
}

// --- Mock Data ---
const resources: Resource[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    type: 'book',
    author: 'Pastor John Doe',
    price: 10000.00,
    description: 'A comprehensive guide to strengthening your daily walk with God.',
  },
  {
    id: '2',
    title: 'Sodgem Monthly Journal - Jan',
    type: 'journal',
    author: 'Editorial Team',
    price: 2000.50,
    description: 'Reflections, prayer points, and community updates for January.',
  },
  {
    id: '3',
    title: 'Songs of Deliverance',
    type: 'hymnal',
    author: 'Sodgem Choir',
    price: 1000.00,
    description: 'Digital lyrics and sheet music for our 50 most beloved hymns.',
  },

];

export default function ResourceStore() {
  const [filter, setFilter] = useState<ResourceType | 'all'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  // Filter logic
  const filteredResources = resources.filter(
    (r) => filter === 'all' || r.type === filter
  );

  // Simulate Payment Handler
  const handlePurchase = async (resource: Resource) => {
    setProcessingId(resource.id);

    // ---------------------------------------------------------
    // REAL WORLD: Call your Payment API here (Stripe/Paystack)
    // ---------------------------------------------------------
    
    // Simulating network request delay
    setTimeout(() => {
      setPurchasedIds((prev) => [...prev, resource.id]);
      setProcessingId(null);
      // alert(`Payment successful for: ${resource.title}. Download started.`);
      alert(`Kindly pay into the following Account:

Name: SPRING OF DIVINE GRACE EVANGELICAL MISSION
ACC NO: 0065419075
BANK: STERLING BANK
AMOUNT: ${resource.price}

After payment, email us the receipt to:
info@springsofdivinegrace.com

We will immediately send you the download link.`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar/>
      {/* Header */}
      <header className="bg-blue-900 text-white py-32 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Sodgem Digital Resources</h1>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Edify your spirit. Download books, journals, and hymnals instantly.
          Proceeds support our community outreach.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { id: 'all', label: 'All Items', icon: null },
            { id: 'book', label: 'Books', icon: <Book size={18} /> },
            { id: 'journal', label: 'Journals', icon: <FileText size={18} /> },
            
            { id: 'hymnal', label: 'Hymnals', icon: <Music size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as ResourceType | 'all')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => {
            const isPurchased = purchasedIds.includes(resource.id);
            const isProcessing = processingId === resource.id;

            return (
              <div 
                key={resource.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Card Header / Image Placeholder */}
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                    <div className="text-gray-400">
                        {resource.type === 'book' && <Book size={64} />}
                        {resource.type === 'book' && <Image src="/bible_study.jpeg" width={500} height={500} alt="Picture of the author"  />}
                        {resource.type === 'journal' && <FileText size={64} />}
                        {resource.type === 'journal' && <Image src="/prayer_journal.png" width={500} height={500} alt="Picture of the author" />}
                        {resource.type === 'hymnal' && <Music size={64} />}
                        {resource.type === 'hymnal' && <Image src="/hymnal2.png" width={500} height={500} alt="Picture of the author" />}
                    </div>
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900 uppercase tracking-wide">
                        {resource.type}
                    </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-blue-600 mb-4">{resource.author}</p>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{resource.description}</p>

                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 text-sm">Contribution</span>
                        <span className="text-2xl font-bold text-gray-900">N{resource.price.toFixed(2)}</span>
                    </div>

                    {isPurchased ? (
                      <button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                        onClick={() => alert('Check your email for download link...')}
                      >
                        <Download size={20} />
                        Download Now
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(resource)}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                          isProcessing 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-900 hover:bg-blue-800 text-white shadow-md hover:shadow-lg'
                        }`}
                      >
                        {isProcessing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <CreditCard size={18} />
                            Pay & Download
                          </>
                        )}
                      </button>
                    )}
                    
                    {!isPurchased && (
                        <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-400">
                            <Lock size={12} />
                            <span>Secure Payment</span>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer/>
    </div>
  );
}