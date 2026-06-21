import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    badge: "BESTSELLER",
    headline: "Handpicked Kashmiri Walnuts — Nature's Brain Food",
    subline: "Sourced directly from Kashmir Valley orchards",
    image: "https://images.unsplash.com/photo-1575481636764-7f226094aa96?w=1600&h=900&fit=crop",
  },
  {
    badge: "ORGANIC",
    headline: "Organic California Almonds — 100% Pesticide-Free",
    subline: "Certified USDA Organic • Non-GMO Project Verified",
    image: "https://images.unsplash.com/photo-1613255348581-8237e6f84503?w=1600&h=900&fit=crop",
  },
  {
    badge: "NEW ARRIVAL",
    headline: "Sun-Dried Afghan Raisins — Nature's Sweetness",
    subline: "Traditionally dried under the Afghan sun",
    image: "https://images.unsplash.com/photo-1596401057633-0f02cd18db7b?w=1600&h=900&fit=crop",
  },
  {
    badge: "FEATURED",
    headline: "The Royal Gift Box — Premium Mixed Dry Fruits",
    subline: "Curated selection for festive gifting",
    image: "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=1600&h=900&fit=crop",
  },
  {
    badge: "OUR STORY",
    headline: "From Farm to Table — The Divya Promise",
    subline: "Family-run since 1985 • 40 years of trust",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=1600&h=900&fit=crop",
  },
];

const navItems = [
  { label: "DRY FRUITS", heading: "Premium Collection", desc: "Almonds, Cashews, Walnuts & more", href: "/shop" },
  { label: "SEEDS & NUTS", heading: "Healthy Seeds", desc: "Pumpkin, Sunflower, Flax seeds", href: "/shop" },
  { label: "DRIED FRUITS", heading: "Natural Dried Fruits", desc: "Raisins, Dates, Figs, Apricots", href: "/shop" },
  { label: "GIFT BOXES", heading: "Festive Gifting", desc: "Curated gift hampers for all occasions", href: "/shop" },
  { label: "BLOG", heading: "Health & Recipes", desc: "Nutrition tips and delicious recipes", href: "/blog" },
  { label: "ABOUT US", heading: "Our Story", desc: "Learn about our journey since 1985", href: "/about" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax
  useEffect(() => {
    if (!heroRef.current || !bgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  // Text animation on slide change
  useEffect(() => {
    if (!textRef.current) return;
    const els = textRef.current.querySelectorAll(".animate-item");
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [active]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  const slide = slides[active];

  return (
    <section ref={heroRef} className="relative w-full min-h-[100dvh] overflow-hidden">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src={slide.image}
          alt={slide.headline}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh]">
        {/* Left Content */}
        <div className="flex-1 flex items-center px-6 lg:px-16 py-24">
          <div ref={textRef} className="max-w-xl">
            <span className="animate-item inline-block px-3 py-1.5 bg-[#E8F5E9] text-[#1B5E20] text-[11px] font-bold uppercase tracking-[1.5px] rounded mb-4">
              {slide.badge}
            </span>
            <h1 className="animate-item font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.2] mb-4">
              {slide.headline}
            </h1>
            <p className="animate-item text-sm md:text-base text-white/80 mb-8">
              {slide.subline}
            </p>
            <Link
              to="/shop"
              className="animate-item inline-block px-8 py-3.5 bg-[#1B5E20] text-white text-sm font-medium uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all duration-200"
            >
              Shop Now
            </Link>

            {/* Dots */}
            <div className="animate-item flex items-center gap-2 mt-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    i === active ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
              <button
                onClick={() => setPaused(!paused)}
                className="ml-3 w-7 h-7 border border-white/40 rounded flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
              >
                {paused ? (
                  <svg width="8" height="10" viewBox="0 0 8 10"><polygon points="0,0 8,5 0,10" fill="currentColor" /></svg>
                ) : (
                  <svg width="8" height="10" viewBox="0 0 8 10"><rect x="0" y="0" width="3" height="10" fill="currentColor" /><rect x="5" y="0" width="3" height="10" fill="currentColor" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Nav Panel — Desktop */}
        <div className="hidden lg:flex w-[35%] bg-white/95 backdrop-blur-sm flex-col justify-center px-8 border-l border-white/20">
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="group block py-3 px-4 rounded transition-all duration-200 hover:bg-[#E8F5E9]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
                  {item.label}
                </span>
                <h3 className="font-serif text-lg text-[#1B5E20] group-hover:text-[#1B5E20] leading-tight mt-0.5">
                  {item.heading}
                </h3>
                <p className="text-xs text-[#999] mt-0.5 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-200 overflow-hidden">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
