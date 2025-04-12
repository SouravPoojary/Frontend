import "./App.css";

import React from "react";
import Navbar from "./Components/Navbar/Navbar"
import AdminPage from "./Pages/AdminPage"
import CustomerPage from "./Pages/CustomerPage";
import ServiceCenterPage from "./Pages/ServiceCenterPage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute"
import { setupAxiosInterceptors } from "./Components/Authentication/AxiosInterceptor";
import { AuthProvider } from "./Components/Authentication/AuthContext";
// import BodyDesign from "./Components/Bodydesign/BodyDesign";



function App() {
  setupAxiosInterceptors();
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/*"
            element={
              <ProtectedRoute requiredRole="CUSTOMER">
                <CustomerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/service-center/*"
            element={
              <ProtectedRoute requiredRole="SERVICE_CENTER">
                <ServiceCenterPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

