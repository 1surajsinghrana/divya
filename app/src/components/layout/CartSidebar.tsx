import { X, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, subtotal, total, coupon, applyCoupon, removeCoupon, discount } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponSuccess(true);
      setCouponError("");
      setTimeout(() => setCouponSuccess(false), 3000);
    } else {
      setCouponError("Invalid coupon code");
      setCouponSuccess(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[4000] bg-black/50 transition-opacity duration-200"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[4001] flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#F2F2F2]">
          <h2 className="font-serif text-xl text-[#1B5E20]">Your Cart</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-4">
                <Trash2 size={32} className="text-[#1B5E20] opacity-50" />
              </div>
              <p className="font-serif text-lg text-[#333]">Your cart is empty</p>
              <p className="text-sm text-[#999] mt-1">Add some delicious dry fruits!</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#1B5E20] text-white text-sm uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 pb-4 border-b border-[#F2F2F2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#333] truncate">{item.name}</h4>
                    <p className="text-xs text-[#999]">{item.weight}</p>
                    <p className="text-sm font-semibold text-[#1B5E20] mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="w-6 h-6 border border-[#e0e0e0] rounded flex items-center justify-center hover:border-[#1B5E20] transition-colors"
                      >
                        <Minus size={12} className="text-[#1B5E20]" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="w-6 h-6 border border-[#e0e0e0] rounded flex items-center justify-center hover:border-[#1B5E20] transition-colors"
                      >
                        <Plus size={12} className="text-[#1B5E20]" />
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="ml-auto text-[#999] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="pt-2">
                {coupon ? (
                  <div className="flex items-center justify-between bg-[#E8F5E9] p-3 rounded">
                    <div>
                      <p className="text-sm font-medium text-[#1B5E20]">Coupon: {coupon.code}</p>
                      <p className="text-xs text-[#2E7D32]">
                        {coupon.type === "percent" ? `${coupon.discount}% off` : `${formatPrice(coupon.discount)} off`} applied
                      </p>
                    </div>
                    <button onClick={removeCoupon} className="text-sm text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError("");
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-[#e0e0e0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-[#1B5E20] text-white text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                    {couponSuccess && <p className="text-xs text-[#2E7D32] mt-1">Coupon applied!</p>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#F2F2F2] p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E7D32]">Discount</span>
                <span className="text-[#2E7D32]">-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Shipping</span>
              <span className="text-[#2E7D32]">{subtotal >= 999 ? "Free" : formatPrice(49)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-[#F2F2F2]">
              <span>Total</span>
              <span className="text-[#1B5E20]">{formatPrice(total + (subtotal >= 999 ? 0 : 49))}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full mt-3 py-3 bg-[#1B5E20] text-white text-center text-sm font-medium uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
