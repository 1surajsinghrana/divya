import { useState } from "react";
import { Check } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="bg-[#1B5E20] py-12 lg:py-20">
      <div className="max-w-[600px] mx-auto px-4 lg:px-6 text-center">
        <h2 className="font-serif text-2xl lg:text-4xl text-white">
          Join the Divya Family
        </h2>
        <p className="text-white/70 mt-3 text-sm lg:text-base">
          Get health tips, delicious recipes, and exclusive offers delivered to your inbox.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-white">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Check size={18} className="text-white" />
            </div>
            <span className="text-lg">Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 rounded text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#D4AF37] text-[#1B5E20] font-medium uppercase tracking-wider text-sm rounded hover:bg-[#c9a430] transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="text-white/40 text-xs mt-3">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
