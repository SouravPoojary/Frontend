import React, { useEffect, useState } from "react";
import "./../Styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

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
  
  const adminCred = {
    email: "admin@123",
    password: "321",
    role: "admin",
    userId:0,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (loginData.role === "admin") {
      if (
        loginData.email === adminCred.email &&
        loginData.password === adminCred.password
      ) {
        alert("Login Successful as Admin");
        setErrorMessage("");
        hideForm();
        localStorage.setItem("loggedInUser",JSON.stringify(adminCred))
        navigate("/admin");
      } else {
        setErrorMessage("Invalid admin credentials");
      }
    }
    else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) =>
          u.email === loginData.email &&
          u.password === loginData.password &&
          u.role === loginData.role
      );

      if (!user) {
        const roleExists = users.some((u) => u.role === loginData.role)
        if (!roleExists) {
          setErrorMessage(`Invalid role selected: ${loginData.role}`);
        }
        else {
          setErrorMessage('Invalid username or password');
        }
      } else {
        alert(`Login Successful as ${loginData.role}`);
        setErrorMessage('');
        hideForm(); 
        localStorage.setItem("loggedInUser", JSON.stringify(user))
        
        setUserData(user)
       

        // if (loginData.role === "admin") {
        //   navigate("/admin")
     
        if (loginData.role === "customer") {
          navigate("/customer")
        } else if (loginData.role === "service center") {
          navigate("/service-center")
        }
      }
      setLoginData({ email: "", password: "", role: "" });
    
    };
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
            value={loginData.role }
            onChange={handleChange}
            required
          >
            {/* onChange={(e) => setRole(e.target.value)}> */}
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="service center">Service Center</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Username
            <input
              type="email"
              name="email"
              placeholder="enter your username"
              value={loginData.email }
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
