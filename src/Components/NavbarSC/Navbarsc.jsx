import React, { useEffect, useState } from "react";
import '../Styles/Navbarsc.css';
import "../Styles/ServiceCenter/ProfileData.css";
import AddService from "./AddService";
import ViewService from "./ViewService";

import { useNavigate } from "react-router-dom";
import ViewAppointmentSC from "./ViewAppointmentSC";
import axios from "axios";
// import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

const Navbarsc = ({setServices}) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(null);
  
  const [services, setLocalServices] = useState([]);
  const [userData,setUserData]=useState(null)
  const navigate = useNavigate()

    useEffect(
      () => async () => {
        const storedServices =
          JSON.parse(localStorage.getItem("services")) || [];
        setLocalServices(storedServices);

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        // const loggedInUser = await axios.get(
        //   "http://localhost:8080/scenter/getByRole"
        // );
        // console.log("by role", loggedInUser.data);
        if (loggedInUser) {
          setUserData(loggedInUser);
        }
      },
      [navigate]
    );
  


    const handleClick = (btnname) => {
   setIsDropDownOpen((prev)=>(prev===btnname?null:btnname))  
     console.log("userdata",userData)
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

      <div className="nav-section">
        <button className="nav-btn" onClick={() => handleClick("btnservice")}>
          My Service
        </button>
        {isDropDownOpen === "btnservice" && (
          <ul className="dropdown-list">
            <li onClick={() => setIsDropDownOpen("addservice")}>Add Service</li>
            <li onClick={() => setIsDropDownOpen("viewservice")}>
              View Service
            </li>
          </ul>
        )}

        {isDropDownOpen === "addservice" && (
          <div className="dropdown-content">
            <AddService serviceCenter={userData} />
            {/* onAddService={handleAddService}  */}
          </div>
        )}

        {isDropDownOpen === "viewservice" && (
          <div className="dropdown-content">
            <ViewService />
          </div>
        )}
      </div>

      <div className="nav-section">
        <button className="nav-btn" onClick={() => handleClick("appointment")}>
          Appointment
        </button>
        {isDropDownOpen === "appointment" && (
          <ul className="dropdown-list">
            <li onClick={() => setIsDropDownOpen("viewappointment")}>
              View Appointment{" "}
            </li>
          </ul>
        )}
        {isDropDownOpen === "viewappointment" && (
          <div className="dropdown-content">
            <ViewAppointmentSC />
          </div>
        )}
      </div>

      <div className="nav-section">
        <button className="nav-btn" onClick={() => handleClick("myprofile")}>
          Profile
        </button>
        {isDropDownOpen === "myprofile" && userData && (
          <div className="dropdown-content profile-data">
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
      </div>

      <button id="logout" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbarsc;

