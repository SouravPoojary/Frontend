import React, { useState } from "react";
import { AddCategory } from "../NavbarCM/AddCategory";
export const Navbaram = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [addform, setAddForm] = useState(false);

  const handleClick = (aname) => {
    setIsDropDownOpen((prev) => (prev === aname ? null : aname));
  };
  const handleForm = (type) => {
    setAddForm(type);
  };
  return (
    <div className="navbar">
      <div className="logo">
        <h2>VSM</h2>
      </div>
      <ul className="category">
        <a onClick={() => handleClick("acategory")}>Category</a>
        {isDropDownOpen === "acategory" && (
          <ul className="content">
            <li onClick={() => handleForm("licategory")}>Add Category</li>
            <li>View Category</li>
          </ul>
        )}
        <div className="addcategory">
          {addform === "licategory" && <AddCategory handleForm={handleForm} />}
        </div>
      </ul>
      <ul className="service">
        <a onClick={() => handleClick("aservice")}> Services</a>
        {isDropDownOpen === "aservice" && <li>All Services</li>}
      </ul>
      <ul className="appointment">
        <a onClick={() => handleClick("a-appoint")}>Appointment</a>
        {isDropDownOpen === "a-appoint" && <li>View Appointment</li>}
      </ul>
      <ul className="user">
        <a onClick={() => handleClick("auser")}> User</a>
        {isDropDownOpen === "auser" && (
          <ul className="content">
            <li>View Profile</li>
            <li>View Customer</li>
            <li>View service Center</li>
            <li>Register Admin</li>
          </ul>
        )}
      </ul>
    </div>
  );
};
