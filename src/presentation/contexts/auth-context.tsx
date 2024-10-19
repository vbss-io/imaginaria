import { User } from "@/domain/models/User";
import { createContext, useEffect, useState } from "react";

interface Login {
  username: string;
  role: string;
  token: string;
}

export const AuthContext = createContext(
  {} as {
    token: string;
    user: User | null;
    login: ({ username, role, token }: Login) => void;
    logout: () => void;
  }
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const deleteFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>(getFromLocalStorage("token"));
  const [user, setUser] = useState<User | null>(getFromLocalStorage("user"));

  useEffect(() => {
    window.addEventListener("Logout", logout);
    return () => {
      window.removeEventListener("Logout", logout);
    };
  }, []);

  const login = ({ username, role, token }: Login) => {
    const isAdmin = role === "administrator";
    setToken(token);
    saveToLocalStorage("token", token);
    setUser({ username, role, isAdmin });
    saveToLocalStorage("user", {
      username,
      role,
      isAdmin,
    });
  };

  const logout = () => {
    deleteFromLocalStorage("token");
    deleteFromLocalStorage("user");
    setToken("");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
