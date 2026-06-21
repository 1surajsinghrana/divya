import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin, Heart, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1B5E20] text-white">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Leaf size={24} className="text-white" />
              <span className="font-serif text-xl font-semibold">Divya Dry Fruits</span>
            </Link>
            <p className="text-sm text-white/60 mt-3 leading-relaxed">
              Premium Organic Dry Fruits Since 1985. Bringing nature&apos;s finest to your doorstep.
            </p>
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Phone size={14} className="text-[#D4AF37]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Mail size={14} className="text-[#D4AF37]" />
                <span>hello@divyadryfruits.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={14} className="text-[#D4AF37]" />
                <span>42, MG Road, Bangalore — 560001</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-[#D4AF37] mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {["All Products", "Almonds", "Cashews", "Walnuts", "Gift Boxes"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "All Products" ? "/shop" : `/shop?category=${item.toLowerCase()}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-[#D4AF37] mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Story", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-[#D4AF37] mb-4">Support</h4>
            <ul className="space-y-2.5">
              {["FAQs", "Shipping & Returns", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-[#D4AF37] mt-6 mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all duration-200"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            {/* Payment Icons */}
            <div className="mt-5 flex items-center gap-2">
              {["Visa", "Mastercard", "RuPay", "UPI"].map((name) => (
                <span
                  key={name}
                  className="text-[10px] font-medium bg-white/10 px-2 py-1 rounded text-white/50"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">&copy; 2025 Divya Dry Fruits. All rights reserved.</p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Made with <Heart size={10} className="fill-red-400 text-red-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
