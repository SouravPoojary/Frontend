import React, { useEffect, useState } from "react";
import AddCategory from "../NavbarAM/AddCategory";
import { useNavigate } from "react-router-dom";
import ViewAllService from "./ViewAllService";
import ViewAllAppointment from "./ViewAllAppointment";
import "../Styles/Admin/ViewCustomer.css";
import "../Styles/Admin/ViewServiceCenter.css"
import "../Styles/Admin/Navbaram.css"
import axios from "axios";
const Navbaram = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(null);
  const [addform, setAddForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
          setUserData(loggedInUser);
        }

        const response = await axios.get(
          "http://localhost:8080/customer/getAll"
        );
        const allUsers = Object.values(response.data);

        // Filter users based on roles
        const customers = allUsers.filter((user) => user.role === "CUSTOMER");
        const serviceCenters = allUsers.filter(
          (user) => user.role === "SERVICE_CENTER");

        setUsers({ customers, serviceCenters });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleClick = (aname) => {
    setIsDropDownOpen((prev) => (prev === aname ? null : aname));
  };

  const handleForm = (type) => {
    setAddForm(type);
  };

  // Delete user from the database
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/customer/delete/${id}`);
      setUsers((prev) => ({
        customers: prev.customers.filter((user) => user.id !== id),
        serviceCenters: prev.serviceCenters.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <h2>VSM</h2>
        </div>

        <div className="nav-section">
          <button className="onClick" onClick={() => handleClick("aservice")}>
            {" "}
            Services
          </button>
          {isDropDownOpen === "aservice" && (
            <ul className="dropdown">
              <li onClick={() => setIsDropDownOpen("viewallservice")}>
                All Services
              </li>
            </ul>
          )}
          {isDropDownOpen === "viewallservice" && (
            <div className="dropdown-content">
              <ViewAllService />
            </div>
          )}
        </div>

        <div className="nav-section">
          <button onClick={() => handleClick("a-appoint")}>Appointment</button>
          {isDropDownOpen === "a-appoint" && (
            <ul className="dropdown">
              <li onClick={() => setIsDropDownOpen("viewallappointment")}>
                View All Appointment
              </li>
            </ul>
          )}
          {isDropDownOpen === "viewallappointment" && (
            <div className="dropdown-content">
              <ViewAllAppointment />
            </div>
          )}
        </div>

        <div className="nav-section">
          <button onClick={() => handleClick("auser")}>User</button>
          {isDropDownOpen === "auser" && (
            <ul className="dropdown">
              <button onClick={() => handleClick("my-profile")}>
                View Profile
              </button>
              <li onClick={() => handleClick("view-customer")}>
                View Customer
              </li>
              <li onClick={() => handleClick("view-service-center")}>
                View service Center
              </li>
              {/* <li>Register Admin</li> */}
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
                    <td>{userData[0].email}</td>
                    <td>{userData[0].role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {isDropDownOpen === "view-customer" && users.customers.length > 0 && (
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
                  {users.customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.fullname}</td>
                      <td>{customer.email}</td>
                      <td>{customer.contact}</td>
                      <td>{customer.address}</td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => handleDelete(customer.id)}
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

          {isDropDownOpen === "view-service-center" &&
            users.serviceCenters.length > 0 && (
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
                    {users.serviceCenters.map((center) => (
                      <tr key={center.id}>
                        <td>{center.fullname}</td>
                        <td>{center.email}</td>
                        <td>{center.contact}</td>
                        <td>{center.address}</td>
                        <td>{center.shopname}</td>
                        <td>
                          <button
                            className="delete"
                            onClick={() => handleDelete(center.id)}
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

        <div className="nav-section">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
  
export default Navbaram;



  // const [addform, setAddForm] = useState(false);
  // const [userData, setUserData] = useState(null)
  // const [user, setUser] = useState(null)
  // const[service,setService]=useState(null)
  // const navigate = useNavigate();
  
   
    
  //    useEffect(() => {
  //       const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
  //       if (loggedInUser) {
  //         setUserData(loggedInUser)
  //      }
       
  //      const customer = JSON.parse(localStorage.getItem("users")|| "[]").filter(users=>users.role==="customer")
  //     //  console.log(customer);
  //      setUser(customer)
       
  //      const scenter = JSON.parse(localStorage.getItem("users") || "[]").filter((users) => users.role === "service center");
  //      //  console.log(customer);
  //      setService(scenter);
       
  //     },[])

  // const handleClick = (aname) => {
  //  console.log("user",user)
  //   setIsDropDownOpen((prev) => (prev === aname ? null : aname));
  // };
  // const handleForm = (type) => {
  //   setAddForm(type);
  // };

  // const handleDelete = (index) => {
  //   const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

  //   const updatedCustomer = user.filter((_, i) => i !== index);
  //   // Keep non-customer users unchanged
  //   const remainingUsers = allUsers.filter((user) => user.role !== "customer");
  //   // Merge non-customer users with updated customers
  //   const updatedUsers = [...remainingUsers, ...updatedCustomer];
  //   setUser(updatedCustomer);
  //   localStorage.setItem("users", JSON.stringify(updatedUsers));

  //   const updatedCenter = service.filter((_, i) => i !== index);
  //   const remainingCenter = allUsers.filter((user) => user.role !== "service center");
  //   const updatedService = [...remainingCenter, ...updatedCenter];
  //   setService(updatedCenter);
  //   localStorage.setItem("users", JSON.stringify(updatedService));
  // };

  // const handleLogout = () => {
  //   navigate("/");
  