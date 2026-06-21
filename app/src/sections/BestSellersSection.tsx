import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function BestSellersSection() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.15 });
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="mb-8 lg:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
            Best Sellers
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl text-[#1B5E20] mt-2">
            Customer Favorites
          </h2>
          <p className="text-[#666] mt-2 max-w-lg">
            Our most loved dry fruits, handpicked for quality and taste
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
