import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // 🔥 NEW
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load token + user from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("userDetails");

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Error reading auth data:", err);
    }

    setLoading(false); // 🔥 finished loading
  }, []);

  // Login function
  const login = (newToken, userDetails) => {
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setToken(newToken);
    setUser(userDetails);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token; // 🔥 NEW

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loading, // 🔥 MUST HAVE
        isAuthenticated, // 🔥 MUST HAVE
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
