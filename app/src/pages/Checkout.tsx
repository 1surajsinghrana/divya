import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, Truck, Check, Shield } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

type Step = "address" | "payment" | "success";

export default function Checkout() {
  const { items, subtotal, total, coupon, discount, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("address");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = subtotal >= 999 ? 0 : 49;

  if (items.length === 0 && step !== "success") {
    return (
      <main className="min-h-screen bg-[#FAF8F3] pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-xl text-[#333]">Your cart is empty</p>
          <Link to="/shop" className="text-[#1B5E20] underline mt-2 inline-block">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate Razorpay payment
    await new Promise((r) => setTimeout(r, 2000));
    setOrderId(`DIVYA${Date.now().toString(36).toUpperCase()}`);
    setIsProcessing(false);
    setStep("success");
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "success") {
    return (
      <main className="min-h-screen bg-[#FAF8F3] pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-[#2E7D32]" />
          </div>
          <h1 className="font-serif text-3xl text-[#1B5E20] mb-2">Order Confirmed!</h1>
          <p className="text-[#666] mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-[#999]">Order ID: <span className="font-medium text-[#333]">{orderId}</span></p>
          <p className="text-sm text-[#999] mt-1">A confirmation has been sent to your email.</p>
          <div className="flex gap-3 justify-center mt-8">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#1B5E20] text-white text-sm font-medium uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
            >
              Continue Shopping
            </Link>
            {user && (
              <Link
                to="/account/orders"
                className="px-6 py-3 border border-[#1B5E20] text-[#1B5E20] text-sm font-medium uppercase tracking-wider rounded hover:bg-[#1B5E20] hover:text-white transition-all"
              >
                View Orders
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24 pb-16">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#999] mb-8">
          <span className={cn(step === "address" && "text-[#1B5E20] font-medium")}>Address</span>
          <ChevronRight size={14} />
          <span className={cn(step === "payment" && "text-[#1B5E20] font-medium")}>Payment</span>
          <ChevronRight size={14} />
          <span>Confirmation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <div className="bg-white rounded-lg border border-[#F2F2F2] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={20} className="text-[#1B5E20]" />
                  <h2 className="font-serif text-xl text-[#1B5E20]">Shipping Address</h2>
                </div>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
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
                  <div>
                    <label className="text-sm font-medium text-[#333] mb-1 block">Address *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20] resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1 block">Pincode *</label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1B5E20] text-white font-medium uppercase tracking-wider text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white rounded-lg border border-[#F2F2F2] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={20} className="text-[#1B5E20]" />
                  <h2 className="font-serif text-xl text-[#1B5E20]">Payment</h2>
                </div>

                {/* Razorpay Payment Options */}
                <div className="space-y-3 mb-6">
                  <div className="border-2 border-[#1B5E20] rounded-lg p-4 bg-[#E8F5E9]/30">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-[#1B5E20]" />
                      <div>
                        <p className="font-medium text-[#333]">Secure Payment via Razorpay</p>
                        <p className="text-sm text-[#666]">UPI, Cards, Net Banking & Wallets</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-[#E0E0E0] rounded-lg p-4">
                    <p className="text-sm text-[#666]">
                      <span className="font-medium text-[#333]">Cash on Delivery</span> — Available for orders above ₹500
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("address")}
                    className="px-6 py-3 border border-[#E0E0E0] text-[#333] text-sm rounded hover:border-[#1B5E20] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 py-3.5 bg-[#1B5E20] text-white font-medium uppercase tracking-wider text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : `Pay ${formatPrice(total + shipping)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[#F2F2F2] p-6 sticky top-24">
              <h3 className="font-serif text-lg text-[#1B5E20] mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#333] truncate">{item.name}</p>
                      <p className="text-xs text-[#999]">{item.weight} x {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-[#333]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F2F2F2] pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#666]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount ({coupon?.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#666]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-[#2E7D32]" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-[#F2F2F2]">
                  <span>Total</span>
                  <span className="text-[#1B5E20]">{formatPrice(total + shipping)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
