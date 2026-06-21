import Marquee from "react-fast-marquee";
import { Instagram } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1574570068037-5a7973d2bf5e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515543904379-3d757e8a89b8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
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
