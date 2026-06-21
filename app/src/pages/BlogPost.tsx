import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Clock, Share2, Facebook, Twitter } from "lucide-react";
import { blogPosts } from "@/data/products";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-xl text-[#333]">Article not found</p>
          <Link to="/blog" className="text-[#1B5E20] underline mt-2 inline-block">Back to Blog</Link>
        </div>
      </main>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[800px] mx-auto px-4 lg:px-6 pb-8">
            <Link to="/blog" className="inline-flex items-center gap-1 text-white/80 text-sm mb-3 hover:text-white">
              <ChevronLeft size={16} /> Back to Blog
            </Link>
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#D4AF37] bg-white/20 px-2 py-1 rounded">
              {post.category}
            </span>
            <h1 className="font-serif text-2xl lg:text-4xl text-white mt-3 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-4 text-sm text-[#999]">
            <span>By {post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min read
            </span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-[#1B5E20] hover:text-white transition-all">
              <Share2 size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
              <Facebook size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
              <Twitter size={14} />
            </button>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-[#333] leading-relaxed">
          <p className="text-lg lg:text-xl text-[#666] leading-relaxed mb-6">{post.excerpt}</p>
          <p>{post.content}</p>
          <p className="mt-4">
            Dry fruits have been an integral part of Indian cuisine and culture for thousands of years. 
            From the royal kitchens of the Mughal emperors to the everyday home cook, these nutrient-dense 
            foods have always held a special place in our hearts and on our plates.
          </p>
          <h2 className="font-serif text-2xl text-[#1B5E20] mt-8 mb-4">The Health Benefits</h2>
          <p>
            Regular consumption of dry fruits has been linked to numerous health benefits including 
            improved heart health, better brain function, enhanced digestion, and stronger immunity. 
            They are an excellent source of essential vitamins, minerals, antioxidants, and healthy fats.
          </p>
          <p className="mt-4">
            At Divya Dry Fruits, we believe in preserving these natural benefits by ensuring our products 
            are free from harmful chemicals, preservatives, and artificial additives. Every batch is 
            rigorously tested to meet our high quality standards.
          </p>
          <h2 className="font-serif text-2xl text-[#1B5E20] mt-8 mb-4">How to Incorporate Into Your Diet</h2>
          <p>
            Adding dry fruits to your daily routine is easier than you think. Start your morning with 
            a handful of soaked almonds, snack on walnuts and cashews between meals, add raisins to your 
            oatmeal or yogurt, and use dates as a natural sweetener in smoothies and desserts.
          </p>
          <div className="bg-[#E8F5E9] p-6 rounded-lg mt-8 mb-8">
            <p className="font-serif italic text-[#1B5E20] text-lg mb-0">
              &ldquo;Let food be thy medicine and medicine be thy food.&rdquo; — Hippocrates
            </p>
          </div>
          <p>
            We hope this article has inspired you to make dry fruits a regular part of your healthy lifestyle. 
            Explore our premium collection and experience the Divya difference today.
          </p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E0E0E0]">
            <h3 className="font-serif text-xl text-[#1B5E20] mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group">
                  <div className="aspect-video rounded-lg overflow-hidden mb-2">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-serif text-sm text-[#333] group-hover:text-[#1B5E20] transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
