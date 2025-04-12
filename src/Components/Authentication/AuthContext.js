import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
            password,
          
        }
      );

      const { token, role } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      const userData = { email, role };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("USERDETAils",userData)

      setToken(token);
      setUser(userData);

      // Redirect based on role
      if (role === "CUSTOMER") {
        navigate("/customer");
      } else if (role === "SERVICE_CENTER") {
        navigate("/service-center");
      } else if (role === "ADMIN") {
        navigate("/admin");
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  const hasRole = (requiredRole) => {
    return user?.role === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
