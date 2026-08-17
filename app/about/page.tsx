import type { Metadata } from "next";
import { MapPin, Target, Zap, Users2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Our Story, Vision & Mission",
  description:
    "Spring of Divine Grace Evangelical Mission (SODGEM) is a Spirit-filled ministry restoring people to God by grace — a movement of wholeness, restoration, and power across generations and cultures.",
  alternates: { canonical: "/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: siteConfig.name,
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: `${siteConfig.url}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="pt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      {/* Page Header */}
      <header className="relative py-32 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-spring.jpg"
            alt="SODGEM worship gathering"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md mb-6">
            <span className="text-blue-300 text-xs font-black uppercase tracking-widest">
              Our Story &amp; Vision
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            About <span className="text-blue-500">SODGEM</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-200 max-w-3xl leading-relaxed font-medium">
            Spring of Divine Grace Evangelical Mission is more than a church—it
            is a movement of wholeness, restoration, and power.
          </p>
        </div>
      </header>

      {/* Who We Are */}
      <section className="pt-4 pb-24 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-black mb-8 uppercase tracking-[0.2em] text-blue-600">
              Who We Are
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Spring of Divine Grace Evangelical Mission (SODGEM) is a
              Spirit-filled ministry committed to restoring people to God by
              grace. We are a global family of faith-driven believers who
              believe in the transformative power of God&apos;s Word, prayer,
              worship, and grace.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-2xl">
              <p className="text-blue-900 font-bold italic text-lg">
                &ldquo;SODGEM is a movement of wholeness, restoration, and power
                that reaches across generations, cultures, and
                communities.&rdquo;
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/volunteer.jpg"
              width={700}
              height={400}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-[3rem] shadow-2xl"
              alt="Volunteers and members of the SODGEM community"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-24 px-4 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 p-12 rounded-[3rem] border border-slate-800">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} />
            </div>
            <h3 className="text-4xl font-black mb-6 italic font-serif">
              Our Mission
            </h3>
            <p className="text-xl text-slate-400 leading-relaxed">
              To restore people to God by grace and raise a generation that is
              awakened, aligned, and empowered to live as Christ-intentional
              ambassadors of truth, power, and purpose.
            </p>
          </div>
          <div className="bg-blue-600 p-12 rounded-[3rem]">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
              <MapPin size={32} />
            </div>
            <h3 className="text-4xl font-black mb-6 italic font-serif text-white">
              Our Vision
            </h3>
            <p className="text-xl text-blue-100 leading-relaxed">
              To see lives transformed by grace, families healed, communities
              reached, and leaders raised—people who walk in power, love,
              discipline, and divine excellence, impacting the world for Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Our Calling & Model */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
              Our Calling &amp; Model
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Raising holy, successful, and Spirit-led individuals who become
              kingdom ambassadors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Awakening Men",
                icon: <Zap />,
                content:
                  "We raise kingdom ambassadors across spiritual, emotional, financial, and relational areas of life.",
              },
              {
                title: "Rural Church Planting",
                icon: <MapPin />,
                content:
                  "Discipling through rural church planting and targeted empowerment streams in unreached places.",
              },
              {
                title: "Cell Communities",
                icon: <Users2 />,
                content:
                  "Building from the inside out through grace-filled cell groups that heal and disciple deeply.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-black mb-4 text-slate-900">
                  {item.title}
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Values */}
      <section className="py-24 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tighter">
              What Makes SODGEM <span className="text-blue-600">Unique</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "Grace-driven, not performance-driven",
                "Planting churches in unreached places",
                "Restoring marriages and raising families",
                "Training business and ministry leaders",
                "Prioritizing Spirit-led living",
                "Raising children in the way of the Lord",
              ].map((value, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-bold text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}