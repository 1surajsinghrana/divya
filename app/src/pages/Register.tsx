import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const success = await register(name, email, phone, password);
    setLoading(false);
    if (success) {
      navigate("/");
    } else {
      setError("Email already registered. Please try another.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Leaf size={28} className="text-[#1B5E20]" />
            <span className="font-serif text-2xl font-semibold text-[#1B5E20]">Divya Dry Fruits</span>
          </Link>
          <h1 className="font-serif text-2xl text-[#333] mt-6">Create Account</h1>
          <p className="text-[#999] mt-1">Join the Divya family today</p>
        </div>

        <div className="bg-white rounded-lg border border-[#F2F2F2] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#333] mb-1 block">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#333] mb-1 block">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#333] mb-1 block">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#333] mb-1 block">Password *</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999]"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#333] mb-1 block">Confirm Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
            {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1B5E20] text-white font-medium uppercase tracking-wider text-sm rounded hover:bg-[#D4AF37] hover:text-[#1B5E20] transition-all disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#666]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1B5E20] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
