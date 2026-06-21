import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Heart, Sun } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description:
      "All our dry fruits are certified organic, free from pesticides and artificial preservatives. Sourced directly from trusted farms.",
  },
  {
    icon: Heart,
    title: "Rich in Nutrients",
    description:
      "Packed with essential vitamins, minerals, healthy fats, and antioxidants. A natural superfood for your daily wellness routine.",
  },
  {
    icon: Sun,
    title: "Farm Fresh Quality",
    description:
      "Handpicked at peak ripeness and delivered fresh to your doorstep. Our strict quality control ensures only the best reaches you.",
  },
];

export default function HealthBenefitsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.2 });

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-10 lg:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
            Why Choose Us
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl text-[#1B5E20] mt-2">
            Nature&apos;s Power in Every Bite
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f) => (
            <div key={f.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8F5E9] rounded-full mb-5 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
                <f.icon size={32} className="text-[#1B5E20] group-hover:text-[#D4AF37] transition-colors duration-200" />
              </div>
              <h4 className="font-serif text-xl text-[#1B5E20] mb-3">{f.title}</h4>
              <p className="text-[#666] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
