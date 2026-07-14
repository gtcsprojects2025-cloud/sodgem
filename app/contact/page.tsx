"use client"
import React, { useState, useEffect } from 'react';
import {  Users,  CheckCircle2, Phone, Mail, Send, Globe } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {FaInstagram, FaFacebook, FaTwitter, FaYoutube} from 'react-icons/fa'
const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({name: '',  email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
      const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value, })); };

       const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setStatus('loading');
   
       try {
         const response = await fetch('/api/contact', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
         });
   
         if (response.ok) {
           setStatus('success');
           setFormData({ name: '', email: '',  message: '' }); // Clear form
           setSubmitted(true)
         } else {
           setStatus('error');
         }
       } catch (error) {
         console.error('Submission Error:', error);
         setStatus('error');
       }
     };
     const isFormValid = formData.name && formData.email && formData.message;

       const socials = [
         {
           name: 'Facebook',
           href: 'https://www.facebook.com/sodgem',
           icon: FaFacebook,
         },
     
         {
           name: 'Instagram',
           href: 'https://www.instagram.com/springofdivinegrace',
           icon: FaInstagram,
         },
         {
           name: 'Youtube',
           href: 'https://www.youtube.com/@sodgem',
           icon: FaYoutube,
         }
       ]

  return (
    <main className="pt-0">
        <Navbar/>
      <header className="bg-slate-950 py-40  px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">Contact Us</h1>
            <p className="text-xl text-slate-400">For questions, prayer requests, or general inquiries, reach out to us through the appropriate channel below.</p>
          </div>
          <div className="flex space-x-4 pb-4">
            {socials.map((social, i) => (
              <a key={i} href={social.href} target='_blank' className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <social.icon size={20} />
              </a>
            ))}
          </div>

        </div>
      </header>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
              <h3 className="text-xl font-black text-blue-900 mb-6">Direct Channels</h3>
              <div className="space-y-6">
                <a href="tel:+2348033794824" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Call Us</p>
                    <p className="font-bold text-slate-900">+234 803 379 4824</p>
                  </div>
                </a>
                <a href="mailto:info@springsofdivinegrace.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Email Us</p>
                    <p className="font-bold text-slate-900">info@springsofdivinegrace.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-4">Visit Our Office</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                No. 33B Simolade Street, Off Oba-Erinwole Expressway, GRA, Sagamu, Ogun State, Nigeria
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
                                    {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 mb-6 text-sm text-smartGreen border border-smartGreen/30 bg-smartGreen/10 rounded-lg">
                Thank you! Your message has been sent successfully. We will be in touch shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 mb-6 text-sm text-red-700 border border-red-300 bg-red-100 rounded-lg">
                Failed to send message. Please try again or email us directly at support@smartenv.com.
              </div>
            )}
            {!submitted ? (
              <form 
                onSubmit={ handleSubmit }
                className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
              >
                <h2 className="text-3xl font-black mb-10 text-slate-900 tracking-tight">Send a Message</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input type="text"
                    
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                     placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                       />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input type="email" 
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                     className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                      />
                  </div>
                </div>
                <div className="space-y-2 mb-10">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Message or Prayer Request</label>
                  <textarea 
                  id='message'
                  name='message'
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                   placeholder="How can we stand with you in faith?"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-600 transition-all font-medium resize-none"
                   ></textarea>
                </div>
                <button type="submit"
                disabled={status === 'loading' || !isFormValid}
                 className={`w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center space-x-3
                   ${status === 'loading' || !isFormValid
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-black hover:bg-green-500 shadow-md shadow-smartGreen/30'
                  }
                 `}>
                  {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                  <Send size={20} />
                </button>
              </form>
            ) : (
              <div className="bg-blue-600 p-16 rounded-[3rem] text-white text-center shadow-2xl">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-4xl font-black mb-4">Message Received!</h2>
                <p className="text-xl text-blue-100 mb-8">Thank you for reaching out. A member of our team or a minister will stand with you in prayer and respond shortly.</p>
                <button onClick={() => setSubmitted(false)} className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black">Send Another Message</button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
};

export default ContactPage;