import React, { useState } from 'react'

const CustomerRegForm = ({ hideForm,onRegister}) => {
  const [formData, setFormData] = useState({
    fullname:'',
    email: '',
    password: '', 
    contact: '',
    address:'',
    role: 'customer',
    userId:null,
  })
    const handleSubmit = (event) => {
        event.preventDefault();
      hideForm();
      const existingUser = JSON.parse(localStorage.getItem("users")) || [];
     
      
          let lastUserId = 0;
          if (existingUser.length > 0) {
            const lastUser = existingUser[existingUser.length - 1];
            lastUserId = Number(lastUser?.userId) || 0; // Ensure it's a number
          }

          const newUserId = lastUserId + 1; // Increment user ID
      console.log("New User ID:", newUserId);
      
      // const newUserId = existingUser.length
      //   ? existingUser[existingUser.length - 1].userId + 1
      //   : 1;
       const updatedUser = { ...formData, userId: newUserId }; // Assign userId
      const newUsersList = [...existingUser, updatedUser];
      localStorage.setItem("users", JSON.stringify(newUsersList));

      onRegister(updatedUser);

      // const updatedUser = [...existingUser, formData];
      // localStorage.setItem("users", JSON.stringify(updatedUser));
      
      // onRegister(formData);
      setFormData({
        fullname: "",
        email: "",
        password: "",
        contact: "",
        address: "",
        role: "customer",
        userId:null,
      });
      alert('Registration successful')
  }
  
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