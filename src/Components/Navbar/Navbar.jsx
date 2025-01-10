// import React, { useState } from "react";
// import "./../Styles/Navbar.css";
// import LoginForm from "./LoginForm";
// // import '../modalScript';
// import CustomerRegForm from "./CustomerRegForm";
// import ServiceCenterRegForm from "./ServiceCenterRegForm";
// import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

// const Navbar = () => {
//   const [showlogin, setShowlogin] = useState(false);

//   const [formType, setFormType] = useState("");
//   const [isDropDownOpen, setIsDropDownOpen] = useState(false);

//   const toggleLogin = () => {
//     setShowlogin(!showlogin);
//   };

//   const handleRegClick = () => {
//     setIsDropDownOpen(!isDropDownOpen);
//     if (isDropDownOpen) {
//       setFormType("");
//     }
//   };

//   const handleFormSelection = (type) => {
//     setFormType(type);
//     // setIsDropDownOpen(false)
//   };
//   const hideForm = () => {
//     setFormType("");
//   };

//   return (
//     <div className="navbar">
//       <div className="nav-logo">
//         <h2>VSM</h2>
//       </div>
//       <div className="register">
//         <button className="drop" onClick={handleRegClick}>
//           Register
//         </button>
//         {isDropDownOpen && (
//           <div className="content">
//             <a href="#" onClick={() => handleFormSelection("customer")}>
//               Customer
//             </a>
//             <a href="#" onClick={() => handleFormSelection("serviceCenter")}>
//               Service Center
//             </a>
//           </div>
//         )}
//       </div>

//       <div className="form-container">
//         {formType === "customer" && <CustomerRegForm hideForm={hideForm} />}
//         {formType === "serviceCenter" && (
//           <ServiceCenterRegForm hideForm={hideForm} />
//         )}
//       </div>

//       {/* <div className='user-login'> */}
//       <button className="login-button" onClick={toggleLogin}>
//         {showlogin ? "Close" : "Login"}
//       </button>
//       {showlogin && <LoginForm />}
//       {/* </div> */}
//     </div>
//   );
// };
// export default Navbar;


import React, { useState } from "react";
import "../Styles/Navbarsc.css";
import LoginForm from "../Navbar/LoginForm";
import CustomerRegForm from "../Navbar/CustomerRegForm";
import ServiceCenterRegForm from "../Navbar/ServiceCenterRegForm";

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleFormSelection = (type) => {
    setFormType(type);
    setIsDropDownOpen(false);
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
        {formType === "customer" && <CustomerRegForm hideForm={hideForm} />}
        {formType === "serviceCenter" && (
          <ServiceCenterRegForm hideForm={hideForm} />
        )}
      </div>

      <ul className="login">
        <a onClick={toggleLogin} className="login-button">
          {showLogin ? "Close" : "Login"}
        </a>
        {showLogin && <LoginForm />}
      </ul>
    </div>
  );
};

export default Navbar;
