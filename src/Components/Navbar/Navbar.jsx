import React, { useState } from "react";
import "../Styles/Navbarsc.css";
import LoginForm from "../Navbar/LoginForm";
import CustomerRegForm from "../Navbar/CustomerRegForm";
import ServiceCenterRegForm from "../Navbar/ServiceCenterRegForm";

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [users, setUsers] = useState([]);

  const handleRegClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleFormSelection = (type) => {
    setFormType(type);
    setIsDropDownOpen(false);
  };

  const handleRegister = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const hideForm = () => {
    setFormType(null);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <h2>VSM</h2>
      </div>

      <div className="register">
        <ul className="dropdown">
          <a onClick={handleRegClick}>Register</a>
          {isDropDownOpen && (
            <ul className="content">
              <li onClick={() => handleFormSelection("customer")}>Customer</li>
              <li onClick={() => handleFormSelection("serviceCenter")}>
                Service Center
              </li>
            </ul>
          )}
        </ul>
      </div>

      <div className="form-container">
        {formType === "customer" && (
          <CustomerRegForm hideForm={hideForm} onRegister={handleRegister} />
        )}
        {formType === "serviceCenter" && (
          <ServiceCenterRegForm
            hideForm={hideForm}
            onRegister={handleRegister}
          />
        )}
      </div>

      <ul className="login">
        <a onClick={toggleLogin} className="login-button">
          {showLogin ? "Close" : "Login"}
        </a>
        {showLogin && <LoginForm users={users} hideForm={hideForm} />}
      </ul>
    </div>
  );
};

export default Navbar;
