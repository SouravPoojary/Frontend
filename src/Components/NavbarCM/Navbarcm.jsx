import React, { useState } from "react";
import '../Styles/Customer/Navbarcm.css';
const Navbarcm = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(null);
    const[addform,setAddForm]=useState(false)

    const handleClick = (btnname) => {
   setIsDropDownOpen((prev)=>(prev===btnname?null:btnname))  
    }

    const handleForm = (type) => {
        setAddForm(type)
    }
    const hideForm = () => {
        setAddForm(null)
    }
  return (
    <nav className="navbar">
      <div className="navbar-logo">VSM</div>
      {/* <ul className="navbar-links"> */}
    
      <ul className="myappointment">
        <button className="onclick" onClick={() => handleClick("appointment")}>
          Appointment
        </button>
        {isDropDownOpen === "appointment" && <li>View Appointment</li>}
      </ul>
      <ul  className="profile">
        <button className="onclick" onClick={() => handleClick("myprofile")}>
          Profile
        </button>
        {isDropDownOpen === "myprofile" && <li>View Profile</li>}
      </ul>

      <button id="logout" className="onclick">
        Logout
      </button>

      {/* </ul> */}
    </nav>
  );
};

export default Navbarcm;


