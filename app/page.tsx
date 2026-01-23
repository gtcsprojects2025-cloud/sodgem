"use client"
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Calendar, 
  Play, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  MapPin, 
  Menu, 
  X,
  ShieldCheck,
  Star,
  Globe,
  Briefcase,
  ChevronRight
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';

/**
 * Next.js Component: SODGEM Landing Page
 * * Features:
 * - Dynamic Navbar with scroll state
 * - Hero section with responsive typography
 * - Purpose-driven mission overview
 * - Interactive Schedule grid
 * - Restoration Journey cards
 * - Comprehensive footer
 */

export default function App() {


  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
        <Navbar/>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-spring.jpg" 
            alt="Worship Gathering" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Live Your Purpose</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
              JESUS — The Spring That <span className="text-blue-500 italic font-serif">Never</span> Stops.
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-medium">
              Experience a community where grace isn't a theory, but a Person who restores hearts, empowers minds, and awakens destiny.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-blue-600/30 group">
                <a href={'/join'}>Join Us This Sunday</a>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 border border-white/10 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-3">
                <Play size={20} fill="currentColor" />
              
                 <a  href='https://www.youtube.com/watch?v=rXzNPL2uou0' target="_blank" rel="noopener noreferrer">
                  Latest Message
                 </a>
              
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stat card for desktop */}
        <div className="hidden lg:block absolute bottom-12 right-12 z-20">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl max-w-xs text-white">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Member" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-xs font-bold">+500</div>
            </div>
            <p className="text-sm font-bold leading-snug">Join hundreds finding their purpose through Grace every week.</p>
          </div>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section id="about" className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/rest.jfif" 
                className="w-full h-full object-cover" 
                alt="Impact" 
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 bg-blue-600 p-8 rounded-[2rem] text-white shadow-2xl z-20 hidden md:block">
              <h3 className="text-4xl font-black mb-2 italic font-serif">Whole</h3>
              <p className="font-bold opacity-90 leading-tight">Spiritually alive, financially free, and emotionally healed.</p>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full -z-10 blur-3xl opacity-50"></div>
          </div>

          <div>
            <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4">The SODGEM Way</h4>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              We're not building a religion, we're awakening <span className="text-blue-600">restoration</span>.
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              At SODGEM, we believe Grace is a Person—Jesus. Our mission is to raise ambassadors who are complete in every sphere: spirits, minds, and marketplace leaders.
            </p>
            
            <div className="grid gap-6">
              {[
                { icon: <ShieldCheck size={28} />, title: "Spiritually Alive", color: "bg-blue-100 text-blue-600" },
                { icon: <Heart size={28} />, title: "Emotionally Whole", color: "bg-pink-100 text-pink-600" },
                { icon: <Briefcase size={28} />, title: "Marketplace Leaders", color: "bg-indigo-100 text-indigo-600" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default">
                  <div className={`p-4 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-xl font-black text-slate-800">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule - Bento Grid Style */}
      <section id="services" className="py-32 px-4 bg-slate-950 text-white rounded-[4rem] mx-4 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic font-serif">Weekly Gatherings</h2>
              <p className="text-slate-400 text-xl font-medium">Step into a space of power, prayer, and deep biblical wisdom.</p>
            </div>
            <button className="group flex items-center space-x-3 text-blue-400 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
              <span>View Full Calendar</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Main Service */}
            <div className="md:col-span-8 bg-blue-600 p-10 rounded-[3rem] relative overflow-hidden group">
              <Users className="absolute -right-8 -bottom-8 w-64 h-64 text-blue-500 opacity-30 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-md w-fit p-3 rounded-2xl mb-8">
                  <Calendar size={32} />
                </div>
                <h3 className="text-4xl font-black mb-4">Sunday Celebration</h3>
                <p className="text-blue-100 text-lg mb-8 max-w-md">Our main worship experience. Expect dynamic praise and life-transforming teaching from the Word.</p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-slate-900 px-6 py-2 rounded-full font-bold">8:00 AM</span>
                  <span className="bg-slate-900/50 px-6 py-2 rounded-full font-bold">10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Small card 1 */}
            <div className="md:col-span-4 bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:border-slate-700 transition-all">
              <div className="bg-slate-800 w-fit p-3 rounded-2xl mb-8">
                <BookOpen size={32} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-black mb-2">Bible Study</h3>
              <p className="text-slate-400 mb-6">Deep theological dives every Tuesday.</p>
              <div className="text-blue-400 font-mono text-xl">5:00 PM — 7:00 PM</div>
            </div>

            {/* Small card 2 */}
            <div className="md:col-span-4 bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:border-slate-700 transition-all">
              <div className="bg-slate-800 w-fit p-3 rounded-2xl mb-8">
                <Heart size={32} className="text-pink-500" />
              </div>
              <h3 className="text-2xl font-black mb-2">Communion</h3>
              <p className="text-slate-400 mb-6">First Sunday empowerment.</p>
              <div className="text-blue-400 font-mono text-xl">5:00 PM</div>
            </div>

            {/* CTA card */}
            <div className="md:col-span-8 bg-gradient-to-br from-indigo-900 to-blue-900 p-10 rounded-[3rem] flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-black mb-6">First Time Visiting?</h3>
              <p className="text-blue-200 mb-8 max-w-lg">We have a special welcome team ready to make you feel right at home. No pressure, just grace.</p>
              <Link href="/join" className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
}