import React, { useEffect, useState } from "react";
import "./../Styles/LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { em } from "@mantine/core";

const LoginForm = ({hideForm}) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' ,role:''});
  const [errorMessage, setErrorMessage] = useState('');
  const [userData,setUserData]=useState([])
  const navigate = useNavigate()

  useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];
      if (loggedInUser) {
        setUserData(loggedInUser)
      }
    },[])
  
  // const adminCred = {
  //   email: "admin@gmail.com",
  //   password: "321",
  //   role: "ADMIN",
  //   userId:0,
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.role === "ADMIN") {
      const response = await axios.get("http://localhost:8080/admin/default");
      const admin = Object.values(response.data);
     
      console.log("admin", admin);
      

      // if (admin.email === loginData.email &&
      //   admin.password === loginData.password
      // ) 
      if(loginData.email===admin[0].email && loginData.password===admin[0].password)
      {
        alert("Login Successful as Admin");
        setErrorMessage("");
        hideForm();
        localStorage.setItem("loggedInUser", JSON.stringify(admin));
        navigate("/admin");
      } else {
        setErrorMessage("Invalid admin credentials");
      }
    } else {
      //const users = JSON.parse(localStorage.getItem("users")) || [];
      const users = await axios.get("http://localhost:8080/scenter/getAll");
      const usern = Object.values(users.data);
       console.log("user",users.data)
      const user = usern.find(
        (u) =>
          u.role === loginData.role &&
          u.email === loginData.email &&
          u.password === loginData.password
      );

      if (!user) {
        const roleExists = usern.some((u) => loginData.role===u.role);
        if (!roleExists) {
          setErrorMessage(`Invalid role selected: ${loginData.role}`);
        } else {
          setErrorMessage("Invalid username or password");
        }
      } else {
        alert(`Login Successful as ${loginData.role}`);
        setErrorMessage("");
        hideForm();
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        setUserData(user);

        // if (loginData.role === "admin") {
        //   navigate("/admin")

        if (loginData.role === "CUSTOMER") {
          navigate("/customer");
        } else if (loginData.role === "SERVICE_CENTER") {
          navigate("/service-center");
        }
      }

      setLoginData({ email: "", password: "", role: "" });
    }
  }
  
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>User Login</h2>
        <div className="form-group">
          <label htmlFor="userrole">User Role</label>
          <select
            id="role"
            name="role"
            placeholder=" "
            value={loginData.role}
            onChange={handleChange}
            required
          >
            {/* onChange={(e) => setRole(e.target.value)}> */}
            <option value="" disabled>
              Select Role
            </option>
            <option value="ADMIN">ADMIN</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="SERVICE_CENTER">SERVICE_CENTER</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="enter your email)"
              value={loginData.email}
              onChange={handleChange}
              required
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
            ></input>
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

 export default LoginForm;


 //       try {
      //         // Fetch users from both endpoints
      //         // const [usercResponse, usersResponse] = await Promise.all([
      //         //   axios.get("http://localhost:8080/customer/getAll"),
      //         //   // axios.get("http://localhost:8080/scenter/getAll"),
      //         // ]);
      //         const usercResponse=await axios.get("http://localhost:8080/customer/getAll")
      //         console.log("API Response:", usercResponse.data);
        
      //         const custArray=Object.values(usercResponse.data)
      //         // const sercArray = Object.values(usersResponse.data);
      //         // Combine the results
      //         // const combinedUser = [...custArray, ...sercArray];
      //         console.log("users available", custArray)
      //         console.log("type", typeof custArray)
      //         console.log("formdata", loginData);
      //         console.log("typeoflogindata", typeof loginData);
        
      //         // const formdata=Object.values(loginData)
      //         // setLoginData(formdata)
      //         // Find the user based on login credentials
      //         const user = custArray.find(
      //           (u) =>
      //             u.email === loginData.email &&
      //             u.password === loginData.password &&
      //             u.role === loginData.role
      //         );
      //         if (user) {
      //           console.log("User Found:", user);
      //         } else {
      //           console.log("User Not Found");
      //         }
       
      // console.log("Comparing:", {
      //   dbEmail: custArray[1]?.email, // Check a known user
      //   inputEmail: loginData.email,
      //   dbPassword: custArray[1]?.password, // Likely `null`
      //   inputPassword: loginData.password,
      //   dbRole: custArray[1]?.role,
      //   inputRole: loginData.role,
      // });
      //         if (!user) {
      //           const roleExists = custArray.some((u) => u.role === loginData.role)
      //           if (!roleExists) {
      //             setErrorMessage(`Invalid role selected: ${loginData.role}`);
      //           }
      //           else {
             
      //             setErrorMessage('Invalid username or password');
      //           }
      //         } else {
      //           alert(`Login Successful as ${loginData.role}`);
      //           setErrorMessage('');
      //           hideForm();
      //           localStorage.setItem("loggedInUser", JSON.stringify(user))
      //           setUserData(user)
       

      //           // if (loginData.role === "admin") {
      //           //   navigate("/admin")
     
      //           if (loginData.role === "CUSTOMER") {
      //             navigate("/customer")
      //           } else if (loginData.role === "SERVICE_CENTER") {
      //             navigate("/service-center")
      //           }
      //         }
      //       }
      //       catch (error) {
      //         console.error("Error during login:", error);
      //         setErrorMessage("An error occurred during login. Please try again.");
      //       }
      //     }