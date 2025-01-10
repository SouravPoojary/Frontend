import React, { useState } from "react";
import '../Styles/Navbarsc.css';
import AddService from "./AddService";
import ViewService from "./ViewService";
// import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const Navbarsc = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(null);
    const[services,setServices]=useState([])

    const handleClick = (btnname) => {
   setIsDropDownOpen((prev)=>(prev===btnname?null:btnname))  
    }

  const handleAddService = (service) => {
      console.log("Services",service)
    setServices((prev) => [...prev, service])
    console.log("updated",services)
    }
    // const hideForm = () => {
    //     setAddForm(null)
    // }
  return (
    <nav className="navbar">
      <div className="navbar-logo">VSM</div>
      {/* <ul className="navbar-links"> */}
      <div className="myservice">
        {/* <ul className="service"> */}
        <button className="onclick" onClick={() => handleClick("btnservice")}>
          My Service
        </button>
        {isDropDownOpen === "btnservice" && (
          <ul className='content'>
            <li onClick={() => setIsDropDownOpen("addservice")}>Add Service</li>
            <li onClick={() => setIsDropDownOpen("viewservice")}>
              View Service
            </li>
          </ul>
        )}
        {/* </ul> */}

        {isDropDownOpen === "addservice" && (
          <div className="serviceadd">
            <AddService onAddService={handleAddService} />
          </div>
        )}

        {isDropDownOpen === "viewservice" && (
          <div className="serviceview">
            <ViewService services={services} />
          </div>
        )}
      </div>
      <ul className="myappointment">
        <button className="onclick" onClick={() => handleClick("appointment")}>
          Appointment
        </button>
        {isDropDownOpen === "appointment" && <li>View Appointment</li>}
      </ul>
      <ul className="profile">
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


