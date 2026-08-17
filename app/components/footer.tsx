import { MapPin } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/sodgem",
      icon: FaFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/springofdivinegrace",
      icon: FaInstagram,
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/@sodgem",
      icon: FaYoutube,
    },
  ];

  const navigationLinks = [
    { name: "Our Story", href: "/about" },
    { name: "Ministries", href: "/about" },
    { name: "Resources", href: "/resources" },
    { name: "Get Involved", href: "/join" },
    { name: "Contact Us", href: "/contact" },
  ];

  const involvementLinks = [
    { name: "Grace Cell Groups", href: "/join" },
    { name: "Volunteer", href: "/contact" },
    { name: "Missions", href: "/about" },
    { name: "Youth Ministry", href: "/join" },
    { name: "Events", href: "/join" },
  ];

  return (
    <footer
      id="join"
      className="bg-white pt-32 pb-12 px-4 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="font-black text-2xl tracking-tighter">
                SODGEM
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Awakening restoration and raising whole people for global kingdom
              impact.
            </p>
            <div className="flex space-x-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 font-bold hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-8">
              Get Involved
            </h4>
            <ul className="space-y-4">
              {involvementLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 font-bold hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-8">
              Visit Us
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin size={22} className="text-blue-600 mt-1" />
                <span className="text-slate-600 font-bold">
                  Spring of Divine Grace Center,
                  <br />
                  Sagamu, Ogun State, Nigeria
                </span>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Office Hours
                </p>
                <p className="text-slate-700 font-bold text-sm">
                  Mon - Fri: 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs font-black tracking-widest uppercase">
          <p>
            © {new Date().getFullYear()} Spring of Divine Grace Evangelical
            Mission
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/join" className="hover:text-blue-600 transition-colors">
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;