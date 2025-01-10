import React from 'react'

const CustomerRegForm = ({ hideForm }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        hideForm();
     }
  return (
    <div className="form">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="enter ur name" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="enter ur password" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="enter ur email" />
        <label htmlFor="contact">Contact</label>
        <input type="contact" id="" placeholder="enter ur contact" />
        <label htmlFor="">Address</label>
              <input type="address" id="address" placeholder="enter ur address" />
              <button type='submit'>Register</button>
      </form>
    </div>
  );
}
export default CustomerRegForm;