import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "";
  const activeSort = searchParams.get("sort") || "featured";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "5000");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    }

    // Price range
    result = result.filter((p) => {
      const lowestPrice = Math.min(...p.variants.map((v) => v.price));
      return lowestPrice >= minPrice && lowestPrice <= maxPrice;
    });

    // Sort
    switch (activeSort) {
      case "price-low":
        result.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price)));
        break;
      case "price-high":
        result.sort((a, b) => Math.max(...b.variants.map((v) => v.price)) - Math.max(...a.variants.map((v) => v.price)));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [searchQuery, activeCategory, activeSort, minPrice, maxPrice]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl text-[#1B5E20]">
            {activeCategory
              ? categories.find((c) => c.slug === activeCategory)?.name || "Shop"
              : searchQuery
                ? `Search: "${searchQuery}"`
                : "All Products"}
          </h1>
          <p className="text-[#666] mt-2">{filteredProducts.length} products</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded text-sm text-[#333]"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2 rounded", viewMode === "grid" ? "bg-[#1B5E20] text-white" : "text-[#999]")}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2 rounded", viewMode === "list" ? "bg-[#1B5E20] text-white" : "text-[#999]")}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={activeSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="px-4 py-2 border border-[#E0E0E0] rounded text-sm text-[#333] bg-white focus:outline-none focus:border-[#1B5E20]"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#333] mb-3">Search</h4>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => updateParam("search", e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#333] mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => updateParam("category", "")}
                    className={cn(
                      "block text-sm transition-colors",
                      !activeCategory ? "text-[#1B5E20] font-medium" : "text-[#666] hover:text-[#1B5E20]"
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateParam("category", cat.slug)}
                      className={cn(
                        "block text-sm transition-colors",
                        activeCategory === cat.slug ? "text-[#1B5E20] font-medium" : "text-[#666] hover:text-[#1B5E20]"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#333] mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice || ""}
                    onChange={(e) => updateParam("minPrice", e.target.value)}
                    className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-sm"
                  />
                  <span className="text-[#999]">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice || ""}
                    onChange={(e) => updateParam("maxPrice", e.target.value)}
                    className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-[2000] bg-white p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-[#1B5E20]">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-[#999]">
                  Close
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => { updateParam("category", ""); setMobileFiltersOpen(false); }}
                  className={cn("block text-sm py-2", !activeCategory ? "text-[#1B5E20] font-medium" : "text-[#666]")}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { updateParam("category", cat.slug); setMobileFiltersOpen(false); }}
                    className={cn("block text-sm py-2", activeCategory === cat.slug ? "text-[#1B5E20] font-medium" : "text-[#666]")}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-serif text-xl text-[#333]">No products found</p>
                <p className="text-[#999] mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  : "space-y-4"
              )}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
