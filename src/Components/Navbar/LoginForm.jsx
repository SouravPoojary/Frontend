import React, { useEffect, useState } from "react";
import "./../Styles/LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { em } from "@mantine/core";
// import { login } from "../Authentication/AuthService";
import { useAuth } from "../Authentication/AuthContext";

const LoginForm = ({hideForm}) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' ,role:''});
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const result = await login(loginData.email, loginData.password)
    console.log(result.data)
    if (!result.success) {
      setErrorMessage(result.message || "Login failed");
    } else {
      hideForm();
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

