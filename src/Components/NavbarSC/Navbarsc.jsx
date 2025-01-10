import React, { useState } from "react";
import '../Styles/Navbarsc.css';
import AddService from "./AddService";
const Navbarsc = () => {
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
      <div className="myservice">
        <ul className="service">
          <button className="onclick" onClick={() => handleClick("btnservice")}>
            My Service
          </button>
          {isDropDownOpen === "btnservice" && (
            <ul className="content">
              <li onClick={()=>handleForm("addservice")}>Add Service</li>
              <li>View Service</li>
            </ul>
          )}
              </ul>
              <div className="serviceadd">
                  {addform === "addservice" && <AddService hideForm={hideForm}/>}
              </div>
      </div>
      <ul className="myappointment">
        <button className="onclick" onClick={() => handleClick("appointment")}>
          Appointment
        </button>
        {isDropDownOpen === "appointment" && <li>View Appointment</li>}
      </ul>
      <ul ul className="profile">
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

export default Navbarsc;


