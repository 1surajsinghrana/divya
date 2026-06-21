import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart3,
  Plus, Search, Edit, Trash2, X, Leaf, LogOut, Star
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { products, categories } from "@/data/products";

type Tab = "dashboard" | "products" | "orders" | "customers" | "coupons";

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "customers", label: "Customers", icon: Users },
  { id: "coupons", label: "Coupons", icon: Tag },
];

const demoOrders = [
  { id: "DIVYA9X7K2M", customer: "Priya Sharma", date: "2025-12-15", total: 1699, status: "Delivered", items: 3 },
  { id: "DIVYA8P4N1Q", customer: "Rajesh Patel", date: "2025-12-14", total: 849, status: "Shipped", items: 1 },
  { id: "DIVYA7L3W5R", customer: "Ananya Gupta", date: "2025-12-13", total: 2499, status: "Confirmed", items: 2 },
  { id: "DIVYA6M2N4P", customer: "Vikram Malhotra", date: "2025-12-12", total: 499, status: "Pending", items: 1 },
  { id: "DIVYA5K1J3H", customer: "Dr. Sneha Reddy", date: "2025-12-10", total: 1199, status: "Delivered", items: 2 },
  { id: "DIVYA4L0H2G", customer: "Meera Kapoor", date: "2025-12-08", total: 3299, status: "Shipped", items: 4 },
  { id: "DIVYA3J9G1F", customer: "Arjun Nair", date: "2025-12-07", total: 699, status: "Confirmed", items: 1 },
  { id: "DIVYA2H8F0E", customer: "Lakshmi Iyer", date: "2025-12-05", total: 1899, status: "Delivered", items: 3 },
];

const demoCustomers = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", phone: "9876543210", orders: 5, total: 8499 },
  { id: "2", name: "Rajesh Patel", email: "rajesh@example.com", phone: "9876543211", orders: 3, total: 4299 },
  { id: "3", name: "Ananya Gupta", email: "ananya@example.com", phone: "9876543212", orders: 8, total: 15299 },
  { id: "4", name: "Vikram Malhotra", email: "vikram@example.com", phone: "9876543213", orders: 2, total: 2199 },
  { id: "5", name: "Dr. Sneha Reddy", email: "sneha@example.com", phone: "9876543214", orders: 6, total: 11299 },
];

const coupons = [
  { code: "DIVYA10", type: "percent", value: 10, minOrder: 500, uses: 45, active: true },
  { code: "WELCOME20", type: "percent", value: 20, minOrder: 0, uses: 128, active: true },
  { code: "FLAT50", type: "fixed", value: 50, minOrder: 1000, uses: 67, active: true },
  { code: "FESTIVE15", type: "percent", value: 15, minOrder: 1500, uses: 34, active: true },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Confirmed: "bg-purple-100 text-purple-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Admin() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [search, setSearch] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [orderFilter, setOrderFilter] = useState("all");

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-xl text-[#333]">Access Denied</p>
          <p className="text-[#999] mt-2">You need admin privileges to view this page.</p>
          <Link to="/" className="text-[#1B5E20] underline mt-3 inline-block">Go Home</Link>
        </div>
      </main>
    );
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrders = orderFilter === "all"
    ? demoOrders
    : demoOrders.filter((o) => o.status.toLowerCase() === orderFilter);

  const totalRevenue = demoOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B5E20] text-white flex-shrink-0 fixed h-full overflow-y-auto hidden lg:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Leaf size={22} className="text-[#D4AF37]" />
            <span className="font-serif text-lg font-semibold">Divya Admin</span>
          </Link>
        </div>
        <nav className="px-3 pb-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all mb-1",
                activeTab === item.id
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <div className="mt-6 pt-6 border-t border-white/15">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
            >
              <LayoutDashboard size={18} />
              View Store
            </Link>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#1B5E20] text-white z-50 px-4 py-3 flex items-center justify-between">
        <span className="font-serif text-lg font-semibold">Divya Admin</span>
        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "px-3 py-1.5 text-xs rounded whitespace-nowrap",
                activeTab === item.id ? "bg-white/20" : "text-white/60"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        {/* Header */}
        <div className="bg-white border-b border-[#E0E0E0] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#333]">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-sm text-[#999]">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-[#D4AF37] text-[#1B5E20] px-2 py-1 rounded font-medium">
              Admin
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Orders", value: demoOrders.length, icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
                  { label: "Revenue", value: formatPrice(totalRevenue), icon: BarChart3, color: "bg-green-50 text-green-600" },
                  { label: "Products", value: products.length, icon: Package, color: "bg-purple-50 text-purple-600" },
                  { label: "Customers", value: demoCustomers.length, icon: Users, color: "bg-orange-50 text-orange-600" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-lg border border-[#F2F2F2] p-5">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.color} mb-3`}>
                      <stat.icon size={20} />
                    </div>
                    <p className="text-2xl font-semibold text-[#333]">{stat.value}</p>
                    <p className="text-sm text-[#999]">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden mb-8">
                <div className="px-5 py-4 border-b border-[#F2F2F2] flex items-center justify-between">
                  <h3 className="font-medium text-[#333]">Recent Orders</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-sm text-[#1B5E20] hover:underline">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#FAF8F3] text-[#999] text-left">
                        <th className="px-5 py-3 font-medium">Order ID</th>
                        <th className="px-5 py-3 font-medium">Customer</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                        <th className="px-5 py-3 font-medium">Total</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoOrders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-t border-[#F2F2F2]">
                          <td className="px-5 py-3 font-medium text-[#333]">{order.id}</td>
                          <td className="px-5 py-3 text-[#666]">{order.customer}</td>
                          <td className="px-5 py-3 text-[#999]">{new Date(order.date).toLocaleDateString("en-IN")}</td>
                          <td className="px-5 py-3 font-medium text-[#1B5E20]">{formatPrice(order.total)}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-[#F2F2F2] p-5">
                  <h3 className="font-medium text-[#333] mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {products.filter((p) => p.isBestseller).slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#333] truncate">{p.name}</p>
                          <p className="text-xs text-[#999]">{p.reviewCount} reviews</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                          <span className="text-sm font-medium">{p.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-[#F2F2F2] p-5">
                  <h3 className="font-medium text-[#333] mb-4">Inventory Status</h3>
                  <div className="space-y-3">
                    {products.slice(0, 5).map((p) => {
                      const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
                      return (
                        <div key={p.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-[#333]">{p.name}</span>
                            <span className={`text-xs font-medium ${totalStock < 30 ? "text-red-500" : "text-[#2E7D32]"}`}>
                              {totalStock} in stock
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#F2F2F2] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${totalStock < 30 ? "bg-red-400" : totalStock < 60 ? "bg-yellow-400" : "bg-[#1B5E20]"}`}
                              style={{ width: `${Math.min(100, (totalStock / 100) * 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === "products" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1B5E20] text-white text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>

              <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#FAF8F3] text-[#999] text-left">
                        <th className="px-5 py-3 font-medium">Product</th>
                        <th className="px-5 py-3 font-medium">Category</th>
                        <th className="px-5 py-3 font-medium">Price</th>
                        <th className="px-5 py-3 font-medium">Stock</th>
                        <th className="px-5 py-3 font-medium">Rating</th>
                        <th className="px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => {
                        const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
                        const lowestPrice = Math.min(...product.variants.map((v) => v.price));
                        return (
                          <tr key={product.id} className="border-t border-[#F2F2F2]">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded" />
                                <span className="font-medium text-[#333]">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-[#666]">{product.category}</td>
                            <td className="px-5 py-3 font-medium text-[#1B5E20]">{formatPrice(lowestPrice)}+</td>
                            <td className="px-5 py-3">
                              <span className={totalStock < 30 ? "text-red-500" : "text-[#2E7D32]"}>
                                {totalStock}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1">
                                <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                                <span>{product.rating}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1.5 text-[#999] hover:text-[#1B5E20] transition-colors">
                                  <Edit size={14} />
                                </button>
                                <button className="p-1.5 text-[#999] hover:text-red-500 transition-colors">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Modal */}
              {showProductModal && (
                <div className="fixed inset-0 z-[5000] bg-black/50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-5 border-b border-[#F2F2F2]">
                      <h3 className="font-serif text-lg text-[#1B5E20]">Add New Product</h3>
                      <button onClick={() => setShowProductModal(false)} className="text-[#999] hover:text-[#333]">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1 block">Product Name</label>
                        <input className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1 block">Category</label>
                        <select className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]">
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1 block">Description</label>
                        <textarea rows={3} className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20] resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#333] mb-1 block">Price (₹)</label>
                          <input type="number" className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#333] mb-1 block">Stock</label>
                          <input type="number" className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setShowProductModal(false)}
                          className="flex-1 py-2.5 border border-[#E0E0E0] text-[#333] rounded text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setShowProductModal(false)}
                          className="flex-1 py-2.5 bg-[#1B5E20] text-white rounded text-sm hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                        >
                          Save Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {["all", "pending", "confirmed", "shipped", "delivered"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={cn(
                      "px-4 py-2 rounded text-sm capitalize transition-all",
                      orderFilter === f
                        ? "bg-[#1B5E20] text-white"
                        : "bg-white border border-[#E0E0E0] text-[#666] hover:border-[#1B5E20]"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#FAF8F3] text-[#999] text-left">
                        <th className="px-5 py-3 font-medium">Order ID</th>
                        <th className="px-5 py-3 font-medium">Customer</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                        <th className="px-5 py-3 font-medium">Items</th>
                        <th className="px-5 py-3 font-medium">Total</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-t border-[#F2F2F2]">
                          <td className="px-5 py-3 font-medium text-[#333]">{order.id}</td>
                          <td className="px-5 py-3 text-[#666]">{order.customer}</td>
                          <td className="px-5 py-3 text-[#999]">{new Date(order.date).toLocaleDateString("en-IN")}</td>
                          <td className="px-5 py-3 text-[#666]">{order.items}</td>
                          <td className="px-5 py-3 font-medium text-[#1B5E20]">{formatPrice(order.total)}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button className="text-sm text-[#1B5E20] hover:underline">Update</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers */}
          {activeTab === "customers" && (
            <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#FAF8F3] text-[#999] text-left">
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Email</th>
                      <th className="px-5 py-3 font-medium">Phone</th>
                      <th className="px-5 py-3 font-medium">Orders</th>
                      <th className="px-5 py-3 font-medium">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoCustomers.map((c) => (
                      <tr key={c.id} className="border-t border-[#F2F2F2]">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-[#1B5E20]">{c.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium text-[#333]">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-[#666]">{c.email}</td>
                        <td className="px-5 py-3 text-[#999]">{c.phone}</td>
                        <td className="px-5 py-3 text-[#666]">{c.orders}</td>
                        <td className="px-5 py-3 font-medium text-[#1B5E20]">{formatPrice(c.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Coupons */}
          {activeTab === "coupons" && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => { /* TODO: Open coupon modal */ }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1B5E20] text-white text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                >
                  <Plus size={16} />
                  Add Coupon
                </button>
              </div>
              <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#FAF8F3] text-[#999] text-left">
                        <th className="px-5 py-3 font-medium">Code</th>
                        <th className="px-5 py-3 font-medium">Type</th>
                        <th className="px-5 py-3 font-medium">Value</th>
                        <th className="px-5 py-3 font-medium">Min Order</th>
                        <th className="px-5 py-3 font-medium">Uses</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((c) => (
                        <tr key={c.code} className="border-t border-[#F2F2F2]">
                          <td className="px-5 py-3 font-medium text-[#333]">{c.code}</td>
                          <td className="px-5 py-3 text-[#666] capitalize">{c.type}</td>
                          <td className="px-5 py-3 font-medium text-[#1B5E20]">
                            {c.type === "percent" ? `${c.value}%` : formatPrice(c.value)}
                          </td>
                          <td className="px-5 py-3 text-[#666]">{formatPrice(c.minOrder)}</td>
                          <td className="px-5 py-3 text-[#666]">{c.uses}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                              {c.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 text-[#999] hover:text-[#1B5E20] transition-colors">
                                <Edit size={14} />
                              </button>
                              <button className="p-1.5 text-[#999] hover:text-red-500 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
