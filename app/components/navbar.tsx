
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
import Link from 'next/link';
const Navbar = ()=>{

      const [isScrolled, setIsScrolled] = useState(false);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

        // Handle scroll events for navbar transparency
        useEffect(() => {
          const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
          };
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, []);

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Resources', href: '/resources' },
    { name: 'Get Involved', href: '/join' },
  ];
    return(
    
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-xl leading-none tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                SODGEM
              </span>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`}>
                Mission
              </span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-bold uppercase tracking-wider transition-all hover:translate-y-[-1px] ${
                  isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-blue-600 text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              Give Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`p-2 rounded-lg ${isScrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="font-black text-2xl text-blue-600">SODGEM</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-10">
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200">
                Give Now
              </button>
            </div>
          </div>
        </div>
        </nav>
    
    )
}

export default Navbar;