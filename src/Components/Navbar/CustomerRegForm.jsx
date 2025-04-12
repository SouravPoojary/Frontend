import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CustomerRegForm = ({ hideForm,onRegister}) => {
   const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullname:'',
    email: '',
    password: '', 
    contact: '',
    address:'',
    // role: 'CUSTOMER',
    // userId:null,
  })
  //  const navigate = useNavigate()

   
  
const handleSubmit = async (event) => {
  event.preventDefault();
 

  try {
    const response = await axios.post(
      "http://localhost:8080/auth/register/customer",
      formData
    );
    console.log("User saved:", response.data);

    // Auto-login after registration
    // const loginResponse = await axios.post("http://localhost:8080/auth/login", {
    //   email: formData.email,
    //   password: formData.password,
    //   role: "CUSTOMER",
    // });

    //  localStorage.setItem("jwtToken", loginResponse.data.token);
    //  localStorage.setItem("userRole", "CUSTOMER");
    //  localStorage.setItem("userData", JSON.stringify(loginResponse.data.user));

    // Call onRegister with database response
    onRegister(response.data);
     hideForm();
    // navigate("/customer")
    alert("Registration successful! Please login.");
  } catch (error) {
    console.error("Registration error:", error);
    setError(error.response?.data?.message || 'Registration failed');
  }

  setFormData({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    // role: "CUSTOMER",
    // userId: null,
  });
  
};
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({...formData,[id]:value})
  }
  
  return (
    <div className="form">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="enter ur name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="enter ur password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          id="email"
          placeholder="enter ur email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="contact"
          id="contact"
          placeholder="enter ur contact"
          value={formData.contact}
          onChange={handleChange}
        />
        <label htmlFor="">Address</label>
        <input
          type="address"
          id="address"
          placeholder="enter ur address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default CustomerRegForm;