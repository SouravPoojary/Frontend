import React, { useState } from 'react'

const CustomerRegForm = ({ hideForm,onRegister}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
    role:'customer',
  })
    const handleSubmit = (event) => {
        event.preventDefault();
      hideForm();
      onRegister(formData);
      setFormData({ email: "", password: "",role:'customer' });
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
        <input type="text" id="name" placeholder="enter ur name" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="enter ur password" 
          value={formData.password} onChange={handleChange} required
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
        <input type="contact" id="contact" placeholder="enter ur contact" />
        <label htmlFor="">Address</label>
              <input type="address" id="address" placeholder="enter ur address" />
              <button type='submit'>Register</button>
      </form>
    </div>
  );
}
export default CustomerRegForm;