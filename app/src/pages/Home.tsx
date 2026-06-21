import HeroSection from "@/sections/HeroSection";
import BestSellersSection from "@/sections/BestSellersSection";
import BrandStorySection from "@/sections/BrandStorySection";
import HealthBenefitsSection from "@/sections/HealthBenefitsSection";
import FeaturedCategoriesSection from "@/sections/FeaturedCategoriesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import NewsletterSection from "@/sections/NewsletterSection";
import InstagramGallerySection from "@/sections/InstagramGallerySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BestSellersSection />
      <BrandStorySection />
      <HealthBenefitsSection />
      <FeaturedCategoriesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <InstagramGallerySection />
    </main>
  );
}
