import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { blogPosts } from "@/data/products";

export default function Blog() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
            Health & Wellness
          </span>
          <h1 className="font-serif text-3xl lg:text-4xl text-[#1B5E20] mt-2">
            From Our Blog
          </h1>
          <p className="text-[#666] mt-3 max-w-lg mx-auto">
            Discover health tips, delicious recipes, and stories behind our premium dry fruits.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-lg border border-[#F2F2F2] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-[#999] mb-2">
                  <span className="text-[#D4AF37] font-medium">{post.category}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <h3 className="font-serif text-lg text-[#333] leading-snug group-hover:text-[#1B5E20] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#666] mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[#999]">By {post.author}</span>
                  <span className="flex items-center gap-1 text-xs text-[#999]">
                    <Clock size={12} />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
