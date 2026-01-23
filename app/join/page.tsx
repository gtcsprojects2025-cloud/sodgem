"use client"
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Zap,} from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';


const GetInvolvedPage = () => {
  const branches = [
    { name: "Headquarters", address: "No. 33B Simolade Street, Off Oba-Erinwole Expressway, GRA, Sagamu, Ogun State" },
    { name: "Ewuga Branch", address: "No. 25, Beside Ijaya House, Ewuga, Sagamu, Ogun State" },
    { name: "Ayepa Branch", address: "No. 29 Fowoseje Street, Off Ayepa Road, Sagamu, Ogun State" }
  ];

  const serviceTimes = [
    { event: "Sunday Service", time: "8:00 AM" },
    { event: "Covenant Hour of Prayer (Mon)", time: "5:00 PM - 7:00 PM" },
    { event: "Counselling Hour (Mon)", time: "3:00 PM - 5:00 PM" },
    { event: "Bible Studies (Tue)", time: "5:00 PM - 7:00 PM" },
    { event: "Holy Communion (1st Sun)", time: "5:00 PM - 7:00 PM" },
    { event: "Covenant Int'l (2nd Sat)", time: "8:00 AM - 11:00 AM" }
  ];

  return (
    <main className="pt-0">
        <Navbar/>
      <header className="bg-blue-600 py-24 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Get Involved</h1>
          <p className="text-xl text-blue-100 font-medium">Come and drink from a spring that never stops running.</p>
        </div>
      </header>

      <section className="py-24 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Clock className="text-blue-600" /> Service Times
          </h2>
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <div className="space-y-4">
              {serviceTimes.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-slate-200 last:border-0">
                  <span className="font-bold text-slate-900">{item.event}</span>
                  <span className="text-blue-600 font-black text-sm">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-600 rounded-2xl text-white flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><Zap size={24} /></div>
              <p className="font-bold">Cross Over Night: Last day of every month at 10:00 PM</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <MapPin className="text-blue-600" /> Our Locations
          </h2>
          <div className="space-y-6">
            {branches.map((branch, i) => (
              <div key={i} className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-blue-600 transition-colors group">
                <h4 className="text-xl font-black mb-3 text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{branch.name}</h4>
                <p className="text-slate-500 font-medium flex items-start gap-2">
                  <MapPin size={18} className="shrink-0 mt-1 text-slate-300" />
                  {branch.address}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-10 bg-slate-950 rounded-[3rem] text-white">
            <h3 className="text-2xl font-black mb-6">Be Part of the Team</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">Whether you're a professional looking to use your skills for the kingdom, or simply want to volunteer, we have a place for you.</p>
            <div className="grid grid-cols-2 gap-4">
              <Link href={"/contact"} className="bg-white text-slate-900 py-4 rounded-2xl pl-10 font-bold hover:bg-blue-100 transition-all">Volunteer</Link>
              <button className="bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">Support Missions</button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
};

export default GetInvolvedPage;