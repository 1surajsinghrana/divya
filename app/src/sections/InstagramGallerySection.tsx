import Marquee from "react-fast-marquee";
import { Instagram } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1596386461350-326256694e69?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1613255348581-8237e6f84503?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1575481636764-7f226094aa96?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop",
];

export default function InstagramGallerySection() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
          Follow Us
        </span>
        <h4 className="font-serif text-xl text-[#1B5E20] mt-1 flex items-center justify-center gap-2">
          <Instagram size={18} />
          @divyadryfruits
        </h4>
      </div>
      <Marquee speed={40} gradient={false} pauseOnHover>
        {images.map((img, i) => (
          <div key={i} className="relative w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] mx-0.5 group overflow-hidden">
            <img
              src={img}
              alt={`Instagram ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <Instagram
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
