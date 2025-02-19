import React, { useEffect, useState } from "react";
import AddCategory from "../NavbarAM/AddCategory";
import { useNavigate } from "react-router-dom";
import ViewAllService from "./ViewAllService";
import ViewAllAppointment from "./ViewAllAppointment";
import "../Styles/Admin/ViewCustomer.css";
import "../Styles/Admin/ViewServiceCenter.css"
const Navbaram = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(null);
  const [addform, setAddForm] = useState(false);
  const [userData, setUserData] = useState(null)
  const [user, setUser] = useState(null)
  const[service,setService]=useState(null)
  const navigate = useNavigate();
  
   
    
     useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
        if (loggedInUser) {
          setUserData(loggedInUser)
       }
       
       const customer = JSON.parse(localStorage.getItem("users")|| "[]").filter(users=>users.role==="customer")
      //  console.log(customer);
       setUser(customer)
       
       const scenter = JSON.parse(localStorage.getItem("users") || "[]").filter((users) => users.role === "service center");
       //  console.log(customer);
       setService(scenter);
       
      },[])

  const handleClick = (aname) => {
   console.log("user",user)
    setIsDropDownOpen((prev) => (prev === aname ? null : aname));
  };
  const handleForm = (type) => {
    setAddForm(type);
  };

  const handleDelete = (index) => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedCustomer = user.filter((_, i) => i !== index);
    // Keep non-customer users unchanged
    const remainingUsers = allUsers.filter((user) => user.role !== "customer");
    // Merge non-customer users with updated customers
    const updatedUsers = [...remainingUsers, ...updatedCustomer];
    setUser(updatedCustomer);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedCenter = service.filter((_, i) => i !== index);
    const remainingCenter = allUsers.filter((user) => user.role !== "service center");
    const updatedService = [...remainingCenter, ...updatedCenter];
    setService(updatedCenter);
    localStorage.setItem("users", JSON.stringify(updatedService));
  };

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>VSM</h2>
      </div>
      {/* <ul className="category">
        <li onClick={() => handleClick("acategory")}>Category</li>
        {isDropDownOpen === "acategory" && (
          <ul className="content">
            <li onClick={() => handleForm("licategory")}>Add Category</li>
            <li>View Category</li>
          </ul>
        )}
        <div className="addcategory">
          {addform === "licategory" && <AddCategory handleForm={handleForm} />}
        </div>
      </ul> */}

      <div className="service">
        <button className="onClick" onClick={() => handleClick("aservice")}>
          {" "}
          Services
        </button>
        {isDropDownOpen === "aservice" && (
          <li onClick={() => setIsDropDownOpen("viewallservice")}>
            All Services
          </li>
        )}
        {isDropDownOpen === "viewallservice" && (
          <div className="allservice">
            <ViewAllService />
          </div>
        )}
      </div>

      <div className="appointment">
        <li onClick={() => handleClick("a-appoint")}>Appointment</li>
        {isDropDownOpen === "a-appoint" && (
          <li onClick={() => setIsDropDownOpen("viewallappointment")}>
            View All Appointment
          </li>
        )}
        {isDropDownOpen === "viewallappointment" && (
          <div className="allappointment">
            <ViewAllAppointment />
          </div>
        )}
      </div>

      <div className="user">
        <button className="onclick" onClick={() => handleClick("auser")}>
          User
        </button>
        {isDropDownOpen === "auser" && (
          <ul className="content">
            <button onClick={() => handleClick("my-profile")}>
              View Profile
            </button>
            <li onClick={() => handleClick("view-customer")}>View Customer</li>
            <li onClick={() => handleClick("view-service-center")}>
              View service Center
            </li>
            <li>Register Admin</li>
          </ul>
        )}
        {isDropDownOpen === "my-profile" && userData && (
          <div className="profile-data">
            <h2>Profile Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userData.email}</td>
                  <td>{userData.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {isDropDownOpen === "view-customer" && user.length > 0 && (
          <div className="customer-data">
            <h2>Customer Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.fullname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.contact}</td>
                    <td>{customer.address}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isDropDownOpen === "view-service-center" && service.length > 0 && (
          <div className="s-center-data">
            <h2>Services Center Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Shopname</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {service.map((center, index) => (
                  <tr key={index}>
                    <td>{center.fullname}</td>
                    <td>{center.email}</td>
                    <td>{center.contact}</td>
                    <td>{center.address}</td>
                    <td>{center.shopname}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Navbaram;
