import React, { useEffect, useState } from "react";
import '../Styles/Navbarsc.css';
import "../Styles/ServiceCenter/ProfileData.css";
import AddService from "./AddService";
import ViewService from "./ViewService";

import { useNavigate } from "react-router-dom";
import ViewAppointmentSC from "./ViewAppointmentSC";
// import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const Navbarsc = ({setServices}) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(null);
  
  const [services, setLocalServices] = useState([]);
  const [userData,setUserData]=useState(null)
  const navigate = useNavigate()

    useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
      setLocalServices(storedServices);
      
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser) {
        setUserData(loggedInUser);
      }
  }, [navigate]);
  


    const handleClick = (btnname) => {
   setIsDropDownOpen((prev)=>(prev===btnname?null:btnname))  
    }

  // const handleAddService = (service) => {
  //   // setServices((prev) => [...prev, service])
  //   const storedServices=JSON.parse(localStorage.getItem("services")) || []
  //   const updatedServices = [...storedServices, service];
  //   localStorage.setItem("services", JSON.stringify(updatedServices));
  //   setLocalServices(updatedServices);
  //   setServices(updatedServices)
    
  // }

  
  const handleLogout = () => {
    // localStorage.removeItem("services");
    // setServices([])
    navigate("/");
  };

  
  return (
    <nav className="navbar">
      <div className="navbar-logo">VSM</div>

      <div className="myservice">
        <button className="onclick" onClick={() => handleClick("btnservice")}>
          My Service
        </button>
        {isDropDownOpen === "btnservice" && (
          <ul className="content">
            <li onClick={() => setIsDropDownOpen("addservice")}>Add Service</li>
            <li onClick={() => setIsDropDownOpen("viewservice")}>View Service</li>
          </ul>
        )}

        {isDropDownOpen === "addservice" && (
          <div className="serviceadd">
            <AddService />
            {/* onAddService={handleAddService}  */}
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
        {isDropDownOpen === "appointment" && (
          <li onClick={() => setIsDropDownOpen("viewappointment")}>
            View Appointment{" "}
          </li>
        )}
        {isDropDownOpen === "viewappointment" && (
          <div>
            <ViewAppointmentSC />
          </div>
        )}
      </ul>
      <ul className="profile">
        <button className="onclick" onClick={() => handleClick("myprofile")}>
          Profile
        </button>
        {isDropDownOpen === "myprofile" && userData && (
          <div className="profile-data">
            <h2>Profile Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Shop Name</th>
                  <th>Address</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userData.fullname}</td>
                  <td>{userData.email}</td>
                  <td>{userData.contact}</td>
                  <td>{userData.shopname}</td>
                  <td>{userData.address}</td>
                  <td>{userData.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </ul>

      <button id="logout" className="onclick" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbarsc;

