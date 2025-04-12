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
        <h2 onClick={hideForm}>🔧 VSM</h2>
      </div>

      <div className="nav-section">
        <button onClick={handleRegClick}>Register</button>
        {isDropDownOpen && (
          <ul className="dropdown">
            <li onClick={() => handleFormSelection("customer")}>Customer</li>
            <li onClick={() => handleFormSelection("serviceCenter")}>
              Service Center
            </li>
          </ul>
        )}
      </div>

     
      {formType === "customer" && (
        <div className="form-content">
          <CustomerRegForm hideForm={hideForm} onRegister={handleRegister} />
        </div>

        )}
      {formType === "serviceCenter" && (
        <div className="form-content">
          <ServiceCenterRegForm
            hideForm={hideForm}
            onRegister={handleRegister}
          />
          </div>
        )}
      
 <div className="nav-section">
        <button onClick={toggleLogin} >
          {showLogin ? "Close Login" : "Login"}
      </button>
    </div>
    
        
    {showLogin &&( <div className="form-content">
    <LoginForm users={users} hideForm={hideForm} />
  </div>)
  }
    </div>
  );
};

export default Navbar;
