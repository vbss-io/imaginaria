import { User } from "@/domain/models/User/User";
import { createContext, useEffect, useState } from "react";

interface Login {
  username: string;
  role: string;
  token: string;
  avatar?: string;
}

export const AuthContext = createContext(
  {} as {
    token: string;
    user: User | null;
    login: ({ username, role, token, avatar }: Login) => void;
    logout: () => void;
    updateAvatar: (avatar?: string) => void;
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

  const login = ({ username, role, token, avatar }: Login) => {
    const isAdmin = role === "administrator";
    setToken(token);
    saveToLocalStorage("token", token);
    setUser({ username, role, isAdmin, avatar });
    saveToLocalStorage("user", {
      username,
      role,
      isAdmin,
      avatar,
    });
  };

  const logout = () => {
    deleteFromLocalStorage("token");
    deleteFromLocalStorage("user");
    setToken("");
    setUser(null);
    window.location.reload();
  };

  const updateAvatar = (newAvatar?: string) => {
    const updatedUser = { ...(user as User), avatar: newAvatar };
    setUser(updatedUser);
    deleteFromLocalStorage("user");
    console.log("updatedUser", updatedUser);
    saveToLocalStorage("user", {
      ...updatedUser,
      avatar: updatedUser.avatar,
    });
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};
