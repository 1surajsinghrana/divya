import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCart();

  const discount = calculateDiscount(selectedVariant.price, selectedVariant.compareAtPrice || 0);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      image: product.images[0],
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      quantity: 1,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div
      className={cn(
        "group bg-white rounded border border-[#F2F2F2] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isOrganic && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#1B5E20] rounded">
              Organic
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#1B5E20] rounded">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37] text-white rounded">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37] text-white rounded">
              Save {discount}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all hover:bg-[#E8F5E9]"
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-[#999]"
            )}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
          {product.category}
        </span>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg text-[#333] mt-1 leading-tight hover:text-[#1B5E20] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={cn(
                  i < Math.floor(product.rating)
                    ? "fill-[#D4AF37] text-[#D4AF37]"
                    : "text-[#ddd]"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-[#999]">({product.reviewCount})</span>
        </div>

        {/* Weight Options */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={cn(
                "px-2.5 py-1 text-xs rounded border transition-all duration-150",
                selectedVariant.id === v.id
                  ? "bg-[#1B5E20] text-white border-[#1B5E20]"
                  : "bg-white text-[#666] border-[#e0e0e0] hover:border-[#1B5E20]"
              )}
            >
              {v.weight}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#1B5E20]">
              {formatPrice(selectedVariant.price)}
            </span>
            {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
              <span className="text-sm text-[#999] line-through">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 bg-[#1B5E20] text-white rounded flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all duration-200"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="absolute bottom-2 left-2 right-2 bg-[#E8F5E9] text-[#1B5E20] text-sm px-3 py-2 rounded text-center animate-in fade-in slide-in-from-bottom-2">
          Added to cart!
        </div>
      )}
    </div>
  );
}
