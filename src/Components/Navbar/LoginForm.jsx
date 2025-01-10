import React, { useState } from "react";
import "./../Styles/LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-form">
      <form>
        <h2>User Login</h2>
        <div className="form-group">
          <label htmlFor="userrole">User Role</label>
          <select id="role" name="role">
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="service center">Service Center</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="enter your username"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="enter your password"
          ></input>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
