import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-[250px] lg:h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=1600&h=700&fit=crop"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-serif text-3xl lg:text-4xl text-white">Contact Us</h1>
            <p className="text-white/80 mt-2">We&apos;d love to hear from you</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-xl text-[#1B5E20] mb-6">Get in Touch</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <p className="font-medium text-[#333]">Phone</p>
                  <p className="text-sm text-[#666]">+91 98765 43210</p>
                  <p className="text-sm text-[#666]">+91 98765 43211</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <p className="font-medium text-[#333]">Email</p>
                  <p className="text-sm text-[#666]">hello@divyadryfruits.com</p>
                  <p className="text-sm text-[#666]">support@divyadryfruits.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <p className="font-medium text-[#333]">Address</p>
                  <p className="text-sm text-[#666]">42, MG Road, Bangalore — 560001, Karnataka, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <p className="font-medium text-[#333]">Business Hours</p>
                  <p className="text-sm text-[#666]">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-sm text-[#666]">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-[#F2F2F2] p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-[#2E7D32]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#1B5E20]">Message Sent!</h3>
                  <p className="text-[#666] mt-2">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-xl text-[#1B5E20] mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1 block">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1 block">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20] resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 bg-[#1B5E20] text-white font-medium uppercase tracking-wider text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
