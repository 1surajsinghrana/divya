import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartSidebar from "./CartSidebar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const showSolid = scrolled || !isHome;

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
          showSolid
            ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 h-16 lg:h-[72px] flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn("lg:hidden", showSolid ? "text-[#1B5E20]" : "text-white")}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-[1px] transition-colors duration-150 hover:text-[#D4AF37]",
                  showSolid ? "text-[#1B5E20]" : "text-white",
                  location.pathname === link.href && "text-[#D4AF37]"
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={cn(
                  "text-sm font-medium uppercase tracking-[1px] transition-colors duration-150 hover:text-[#D4AF37] text-[#D4AF37]",
                  showSolid ? "" : ""
                )}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <Leaf
              size={28}
              className={cn(
                "transition-colors",
                showSolid ? "text-[#1B5E20]" : "text-white"
              )}
            />
            <span
              className={cn(
                "font-serif text-xl lg:text-2xl font-semibold tracking-wide transition-colors",
                showSolid ? "text-[#1B5E20]" : "text-white"
              )}
            >
              Divya Dry Fruits
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "hidden lg:block transition-colors hover:text-[#D4AF37]",
                showSolid ? "text-[#1B5E20]" : "text-white"
              )}
            >
              <Search size={20} />
            </button>
            <Link
              to={user ? "/account" : "/login"}
              className={cn(
                "hidden lg:block transition-colors hover:text-[#D4AF37]",
                showSolid ? "text-[#1B5E20]" : "text-white"
              )}
            >
              <User size={20} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className={cn(
                "relative transition-colors hover:text-[#D4AF37]",
                showSolid ? "text-[#1B5E20]" : "text-white"
              )}
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-[#C62828] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[3000] bg-[#1B5E20]">
          <div className="flex justify-end p-4">
            <button onClick={() => setMobileOpen(false)} className="text-white">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-6 mt-8">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-white text-xl font-medium uppercase tracking-wider">
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-xl font-medium uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-[#D4AF37] text-xl font-medium uppercase tracking-wider">
                Admin Dashboard
              </Link>
            )}
            <Link to={user ? "/account" : "/login"} onClick={() => setMobileOpen(false)} className="text-white/70 text-lg">
              {user ? `Hello, ${user.name}` : "Sign In / Register"}
            </Link>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[5000] bg-white flex flex-col items-center justify-center px-4">
          <button onClick={() => setSearchOpen(false)} className="absolute top-6 right-6 text-[#333]">
            <X size={28} />
          </button>
          <div className="w-full max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  setSearchOpen(false);
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              autoFocus
              className="w-full text-2xl lg:text-3xl text-[#333] border-b-2 border-[#1B5E20] pb-3 outline-none font-serif placeholder:text-[#999]"
            />
            <p className="text-sm text-[#999] mt-3">Press Enter to search</p>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
