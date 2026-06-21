import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import CartPage from "@/pages/CartPage";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Account from "@/pages/Account";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#FAF8F3] font-sans antialiased">
      <ScrollToTop />
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </AuthProvider>
  );
}
