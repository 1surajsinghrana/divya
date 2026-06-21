import React, { createContext, useContext, useState, useCallback } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@divyadryfruits.com",
    name: "Admin User",
    phone: "9876543210",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Test User",
    phone: "9876543211",
    role: "user",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("divya_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    const found = DEMO_USERS.find(
      (u) => u.email === email && password === "password123"
    );
    if (found) {
      setUser(found);
      localStorage.setItem("divya_user", JSON.stringify(found));
      return true;
    }
    if (email === "admin@divyadryfruits.com" && password === "admin123") {
      const admin = DEMO_USERS[0];
      setUser(admin);
      localStorage.setItem("divya_user", JSON.stringify(admin));
      return true;
    }
    if (email === "user@example.com" && password === "user123") {
      const demoUser = DEMO_USERS[1];
      setUser(demoUser);
      localStorage.setItem("divya_user", JSON.stringify(demoUser));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(
    async (name: string, email: string, phone: string, _password: string): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 500));
      const exists = DEMO_USERS.find((u) => u.email === email);
      if (exists) return false;
      const newUser: User = {
        id: String(DEMO_USERS.length + 1),
        email,
        name,
        phone,
        role: "user",
      };
      DEMO_USERS.push(newUser);
      setUser(newUser);
      localStorage.setItem("divya_user", JSON.stringify(newUser));
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("divya_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin: user?.role === "admin", login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
