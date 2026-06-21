import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, MapPin, LogOut, Leaf, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-xl text-[#333] mb-4">Please sign in to view your account</p>
          <Link
            to="/login"
            className="px-6 py-3 bg-[#1B5E20] text-white text-sm font-medium uppercase tracking-wider rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSave = () => {
    setEditMode(false);
    // In a real app, would call API to update
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "orders" as const, label: "Orders", icon: Package },
    { id: "addresses" as const, label: "Addresses", icon: MapPin },
  ];

  const demoOrders = [
    { id: "DIVYA9X7K2M", date: "2025-12-10", status: "Delivered", total: 1699, items: 3 },
    { id: "DIVYA8P4N1Q", date: "2025-11-28", status: "Shipped", total: 849, items: 1 },
    { id: "DIVYA7L3W5R", date: "2025-11-15", status: "Delivered", total: 2499, items: 2 },
  ];

  const statusColors: Record<string, string> = {
    Delivered: "bg-[#E8F5E9] text-[#2E7D32]",
    Shipped: "bg-blue-50 text-blue-600",
    Pending: "bg-yellow-50 text-yellow-600",
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] pt-20 lg:pt-24 pb-16">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-[#F2F2F2] p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center">
              <User size={28} className="text-[#1B5E20]" />
            </div>
            <div>
              <h1 className="font-serif text-xl text-[#333]">{user.name}</h1>
              <p className="text-sm text-[#999]">{user.email}</p>
              {user.role === "admin" && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#D4AF37] text-white text-xs font-bold uppercase rounded">
                  Admin
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto flex items-center gap-2 px-4 py-2 border border-red-300 text-red-500 text-sm rounded hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[#F2F2F2] overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#E8F5E9] text-[#1B5E20] font-medium"
                      : "text-[#666] hover:bg-[#FAF8F3]"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-[#D4AF37] hover:bg-[#FAF8F3] transition-colors"
                >
                  <Leaf size={18} />
                  Admin Dashboard
                  <ChevronRight size={14} className="ml-auto" />
                </Link>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg border border-[#F2F2F2] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-[#1B5E20]">Profile Information</h2>
                  <button
                    onClick={() => (editMode ? handleSave() : setEditMode(true))}
                    className="px-4 py-2 bg-[#1B5E20] text-white text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all"
                  >
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#999]">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full mt-1 px-4 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    ) : (
                      <p className="text-[#333] font-medium">{user.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-[#999]">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mt-1 px-4 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    ) : (
                      <p className="text-[#333] font-medium">{user.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-[#999]">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full mt-1 px-4 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
                      />
                    ) : (
                      <p className="text-[#333] font-medium">{user.phone || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg border border-[#F2F2F2] p-6">
                <h2 className="font-serif text-xl text-[#1B5E20] mb-4">Order History</h2>
                {demoOrders.length === 0 ? (
                  <p className="text-[#999]">No orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {demoOrders.map((order) => (
                      <div key={order.id} className="border border-[#F2F2F2] rounded-lg p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-[#333]">Order #{order.id}</p>
                            <p className="text-xs text-[#999]">
                              {new Date(order.date).toLocaleDateString("en-IN")} • {order.items} items
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                            <span className="text-sm font-semibold text-[#1B5E20]">
                              ₹{order.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg border border-[#F2F2F2] p-6">
                <h2 className="font-serif text-xl text-[#1B5E20] mb-4">Saved Addresses</h2>
                <div className="border border-[#E0E0E0] rounded-lg p-4 bg-[#FAF8F3]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[#333]">{user.name}</p>
                      <p className="text-sm text-[#666] mt-1">42, MG Road, Near City Center</p>
                      <p className="text-sm text-[#666]">Bangalore, Karnataka — 560001</p>
                      <p className="text-sm text-[#666] mt-1">Phone: {user.phone || "9876543210"}</p>
                    </div>
                    <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium rounded">
                      Default
                    </span>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 border border-[#1B5E20] text-[#1B5E20] text-sm rounded hover:bg-[#1B5E20] hover:text-white transition-all">
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
