import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { categories } from "@/data/products";

export default function FeaturedCategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useScrollReveal<HTMLDivElement>();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 380 + 24;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF8F3] py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div ref={headingRef} className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
              Shop by Category
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl text-[#1B5E20] mt-2">
              Explore Our Collection
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#1B5E20] flex items-center justify-center text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#1B5E20] flex items-center justify-center text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="flex-shrink-0 w-[280px] lg:w-[380px] snap-start group"
            >
              <div className="relative h-[360px] lg:h-[480px] rounded overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <h3 className="font-serif text-xl lg:text-2xl text-white">{cat.name}</h3>
                  <p className="text-sm text-white/70 mt-1">{cat.productCount} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
