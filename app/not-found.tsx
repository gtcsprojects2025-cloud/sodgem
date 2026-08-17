import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-40 text-center">
        <p className="text-8xl md:text-9xl font-black text-blue-600 tracking-tighter">
          404
        </p>
        <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">
          Page Not Found
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back to a place of grace.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/join"
            className="bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
          >
            Get Involved
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}