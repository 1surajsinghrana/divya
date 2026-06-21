import { Leaf, Heart, Sun, Award, Users, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { icon: Leaf, title: "100% Organic", desc: "All products are certified organic, sourced from trusted farms worldwide." },
  { icon: Heart, title: "Family Tradition", desc: "Four decades of passion for bringing the finest dry fruits to Indian homes." },
  { icon: Sun, title: "Farm Fresh", desc: "Handpicked at peak ripeness and delivered fresh to your doorstep." },
  { icon: Award, title: "Premium Quality", desc: "Rigorous quality control ensures only the best reaches you." },
  { icon: Users, title: "Community First", desc: "We support local farming communities and fair trade practices." },
  { icon: Globe, title: "Global Sourcing", desc: "We partner with the world's best orchards from Kashmir to California." },
];

const milestones = [
  { year: "1985", event: "Founded as a small family shop in Bangalore" },
  { year: "1995", event: "Expanded to direct sourcing from Kashmir Valley" },
  { year: "2005", event: "Launched online presence and pan-India shipping" },
  { year: "2015", event: "Achieved 100% organic certification across all products" },
  { year: "2020", event: "Opened new state-of-the-art processing facility" },
  { year: "2025", event: "Serving over 1 million happy customers across India" },
];

export default function About() {
  const valuesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const storyRef = useScrollReveal<HTMLDivElement>();

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24">
      {/* Hero */}
      <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=1600&h=800&fit=crop"
          alt="About Divya Dry Fruits"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
              Since 1985
            </span>
            <h1 className="font-serif text-3xl lg:text-5xl text-white mt-2">
              Our Story
            </h1>
            <p className="text-white/80 mt-3 max-w-lg mx-auto">
              Four decades of bringing nature&apos;s finest dry fruits to Indian homes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 lg:py-20">
        {/* Story */}
        <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
              Our Journey
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-[#1B5E20] mt-2 mb-4">
              From a Small Shop to India&apos;s Favorite Dry Fruits Brand
            </h2>
            <div className="space-y-4 text-[#666] leading-relaxed">
              <p>
                Divya Dry Fruits was founded in 1985 by the Sharma family in the heart of Bangalore. 
                What started as a small neighborhood shop selling premium nuts and dried fruits has 
                grown into one of India&apos;s most trusted dry fruits brands.
              </p>
              <p>
                Our journey has been guided by a simple philosophy: source only the best, process with 
                care, and deliver with love. We believe that everyone deserves access to pure, organic, 
                and nutrient-rich dry fruits that nature intended.
              </p>
              <p>
                Today, we source directly from the finest orchards across Kashmir, California, 
                Afghanistan, Iran, and Goa—ensuring that every product meets our uncompromising 
                quality standards before it reaches your home.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=500&fit=crop"
              alt="Our products"
              className="rounded-lg w-full h-48 lg:h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=400&h=500&fit=crop"
              alt="Gift boxes"
              className="rounded-lg w-full h-48 lg:h-64 object-cover mt-8"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
              What Drives Us
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-[#1B5E20] mt-2">
              Our Values
            </h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-lg border border-[#F2F2F2] p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E8F5E9] rounded-full mb-4">
                  <v.icon size={22} className="text-[#1B5E20]" />
                </div>
                <h3 className="font-serif text-lg text-[#1B5E20] mb-2">{v.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
              Through the Years
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-[#1B5E20] mt-2">
              Our Milestones
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full" />
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-[#E0E0E0] mt-1" />}
                </div>
                <div className="pb-2">
                  <span className="text-sm font-bold text-[#D4AF37]">{m.year}</span>
                  <p className="text-[#666] mt-1">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
