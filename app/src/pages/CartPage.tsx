import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, coupon, applyCoupon, removeCoupon, discount, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const shipping = subtotal >= 999 ? 0 : 49;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (!success) setCouponError("Invalid coupon code");
    else setCouponError("");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-[#1B5E20] opacity-50" />
          </div>
          <h1 className="font-serif text-2xl text-[#333]">Your Cart is Empty</h1>
          <p className="text-[#999] mt-2">Looks like you haven't added anything yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-[#1B5E20] text-white text-sm font-medium uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
          >
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <h1 className="font-serif text-2xl lg:text-3xl text-[#1B5E20] mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#FAF8F3] text-xs font-bold uppercase tracking-wider text-[#999]">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-t border-[#F2F2F2] items-center"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <Link
                        to={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="font-medium text-[#333] hover:text-[#1B5E20] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-[#999]">{item.weight}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm text-[#333]">
                    {formatPrice(item.price)}
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-[#E0E0E0] rounded">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#F2F2F2]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#F2F2F2]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between md:justify-end gap-2">
                    <span className="text-sm font-medium text-[#1B5E20]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-[#999] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[#F2F2F2] p-6 sticky top-24">
              <h3 className="font-serif text-lg text-[#1B5E20] mb-4">Order Summary</h3>

              {/* Coupon */}
              {coupon ? (
                <div className="flex items-center justify-between bg-[#E8F5E9] p-3 rounded mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#1B5E20]">{coupon.code}</p>
                    <p className="text-xs text-[#2E7D32]">
                      {coupon.type === "percent" ? `${coupon.discount}% off` : `${formatPrice(coupon.discount)} off`}
                    </p>
                  </div>
                  <button onClick={removeCoupon} className="text-sm text-red-500">Remove</button>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); }}
                      className="flex-1 px-3 py-2 text-sm border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#1B5E20] text-white text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#666]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#666]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-[#2E7D32]" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-[#F2F2F2]">
                  <span>Total</span>
                  <span className="text-[#1B5E20]">{formatPrice(total + shipping)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full mt-6 py-3.5 bg-[#1B5E20] text-white text-center text-sm font-medium uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="block w-full mt-3 py-3 text-center text-sm text-[#1B5E20] border border-[#1B5E20] rounded hover:bg-[#1B5E20] hover:text-white transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
