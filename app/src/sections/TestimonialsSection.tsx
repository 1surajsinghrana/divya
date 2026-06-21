import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { testimonials } from "@/data/products";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal<HTMLDivElement>();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
            Testimonials
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl text-[#1B5E20] mt-2">
            What Our Customers Say
          </h2>
        </div>

        <div ref={ref} className="max-w-[700px] mx-auto text-center">
          <div className="relative min-h-[200px] flex items-center justify-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-6xl text-[#D4AF37] opacity-40">
              &ldquo;
            </span>
            <div key={active} className="animate-in fade-in duration-500">
              <p className="font-serif italic text-lg lg:text-[22px] text-[#1B5E20] leading-[1.6] px-4">
                {t.quote}
              </p>
              <div className="flex items-center justify-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={cn(
                      i < t.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#ddd]"
                    )}
                  />
                ))}
              </div>
              <p className="font-medium text-[#333] mt-3">{t.author}</p>
              <p className="text-sm text-[#999]">{t.location}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  i === active ? "bg-[#1B5E20] scale-110" : "bg-[#ddd] hover:bg-[#999]"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
