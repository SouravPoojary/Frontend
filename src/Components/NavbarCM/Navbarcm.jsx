import React, { useEffect, useState } from "react";
import '../Styles/Customer/Navbarcm.css';
import ViewAppointment from "../NavbarCM/ViewAppointment";
import { useNavigate } from "react-router-dom";
const Navbarcm = () => {
  const navigate=useNavigate()
  const [isDropDownOpen, setIsDropDownOpen] = useState(null);
   const [userData,setUserData]=useState(null)
  // const[addform,setAddForm]=useState(false)
  
   useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
      if (loggedInUser) {
        setUserData(loggedInUser)
      }
    },[navigate])

    const handleClick = (btnname) => {
   setIsDropDownOpen((prev)=>(prev===btnname?null:btnname))  
  }
  
  const handleLogout = () => {
    navigate("/")
  }

    // const handleForm = (type) => {
    //     setAddForm(type)
    // }
    // const hideForm = () => {
    //     setAddForm(null)
    // }
  return (
    <nav className="navbar">
      <div className="navbar-logo">VSM</div>
      {/* <ul className="navbar-links"> */}

      <ul className="nav-section">
        <button className="nav-btn" onClick={() => handleClick("appointment")}>
          Appointment
        </button>

        {isDropDownOpen === "appointment" && (
          <li onClick={() => setIsDropDownOpen("viewappointment")}>
            View Appointment
          </li>
        )}
        {isDropDownOpen === "viewappointment" && (
          <div className="dropdown-content">
            <ViewAppointment />
          </div>
        )}
      </ul>
      <ul className="nav-section">
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
                  <th>Address</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userData.fullname}</td>
                  <td>{userData.email}</td>
                  <td>{userData.contact}</td>
                  <td>{userData.address}</td>
                  <td>{userData.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </ul>

      <button id="logout" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbarcm;


