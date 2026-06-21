import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, Leaf, ChevronRight } from "lucide-react";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ui/ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const relatedRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "nutrition" | "reviews">("desc");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product || !selectedVariant) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-xl text-[#333]">Product not found</p>
          <Link to="/shop" className="text-[#1B5E20] underline mt-2 inline-block">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const discount = calculateDiscount(selectedVariant.price, selectedVariant.compareAtPrice || 0);
  const related = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      image: product.images[0],
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      quantity: qty,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-[#999]">
          <Link to="/" className="hover:text-[#1B5E20]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-[#1B5E20]">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-[#333]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-20 h-20 rounded overflow-hidden border-2 transition-all",
                    selectedImage === i ? "border-[#1B5E20]" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
                {product.category}
              </span>
              {product.isOrganic && (
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[1.5px] text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
                  <Leaf size={10} /> Organic
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl lg:text-3xl text-[#333]">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={cn(
                      i < Math.floor(product.rating)
                        ? "fill-[#D4AF37] text-[#D4AF37]"
                        : "text-[#ddd]"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-[#666]">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-semibold text-[#1B5E20]">
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
                <>
                  <span className="text-lg text-[#999] line-through">
                    {formatPrice(selectedVariant.compareAtPrice)}
                  </span>
                  <span className="text-sm text-[#D4AF37] font-medium">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Origin */}
            {product.origin && (
              <p className="text-sm text-[#666] mt-2">Origin: {product.origin}</p>
            )}

            {/* Stock */}
            <p className={cn("text-sm mt-1 font-medium", selectedVariant.stock > 0 ? "text-[#2E7D32]" : "text-red-500")}>
              {selectedVariant.stock > 0 ? `In Stock (${selectedVariant.stock} left)` : "Out of Stock"}
            </p>

            {/* Weight Options */}
            <div className="mt-5">
              <label className="text-sm font-medium text-[#333] mb-2 block">Select Weight</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVariant(v); setQty(1); }}
                    className={cn(
                      "px-4 py-2 rounded border-2 text-sm font-medium transition-all",
                      selectedVariant.id === v.id
                        ? "border-[#1B5E20] bg-[#1B5E20] text-white"
                        : "border-[#E0E0E0] text-[#666] hover:border-[#1B5E20]"
                    )}
                  >
                    {v.weight}
                    <span className="block text-xs font-normal opacity-80">
                      {formatPrice(v.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-5">
              <label className="text-sm font-medium text-[#333] mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E0E0E0] rounded">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F2F2F2]"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(selectedVariant.stock, qty + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F2F2F2]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant.stock <= 0}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3.5 rounded font-medium uppercase tracking-wider text-sm transition-all",
                  selectedVariant.stock > 0
                    ? "bg-[#1B5E20] text-white hover:bg-[#D4AF37] hover:text-[#1B5E20]"
                    : "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
                )}
              >
                <ShoppingCart size={18} />
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "w-12 h-12 border-2 rounded flex items-center justify-center transition-all",
                  isWishlisted
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-[#E0E0E0] text-[#999] hover:border-[#1B5E20]"
                )}
              >
                <Heart size={18} className={cn(isWishlisted && "fill-red-500")} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#F2F2F2]">
              <div className="flex items-center gap-2 text-sm text-[#666]">
                <Truck size={16} className="text-[#1B5E20]" />
                Free shipping above ₹999
              </div>
              <div className="flex items-center gap-2 text-sm text-[#666]">
                <ShieldCheck size={16} className="text-[#1B5E20]" />
                Quality guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-6 border-b border-[#E0E0E0]">
            {(["desc", "nutrition", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm font-medium uppercase tracking-wider transition-colors",
                  activeTab === tab
                    ? "text-[#1B5E20] border-b-2 border-[#1B5E20]"
                    : "text-[#999] hover:text-[#333]"
                )}
              >
                {tab === "desc" ? "Description" : tab === "nutrition" ? "Nutrition Info" : "Reviews"}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === "desc" && (
              <div>
                <p className="text-[#666] leading-relaxed">{product.description}</p>
                {product.ingredients && (
                  <div className="mt-4">
                    <h4 className="font-medium text-[#333] mb-2">Ingredients</h4>
                    <p className="text-[#666]">{product.ingredients}</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "nutrition" && (
              <div className="max-w-md">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.nutritionInfo).map(([key, val]) => (
                      <tr key={key} className="border-b border-[#F2F2F2]">
                        <td className="py-3 text-[#666] capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                        <td className="py-3 text-[#333] font-medium text-right">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-[#1B5E20]">{product.rating}</div>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#ddd]"} />
                      ))}
                    </div>
                    <p className="text-xs text-[#999] mt-1">{product.reviewCount} reviews</p>
                  </div>
                </div>
                <p className="text-[#666]">Reviews coming soon! Be the first to review this product.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E0E0E0]">
            <h3 className="font-serif text-xl lg:text-2xl text-[#1B5E20] mb-6">You May Also Like</h3>
            <div ref={relatedRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
