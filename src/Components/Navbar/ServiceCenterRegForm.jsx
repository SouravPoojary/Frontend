import React from 'react'
import "../Styles/Forms.css"
import { useState } from 'react'

const ServiceCenterRegForm = ( {onRegister,hideForm}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'service center'
  })
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev)=>({ ...prev, [id]: value }));
  }

        const handleSubmit = (event) => {
            event.preventDefault();
           hideForm();
          onRegister(formData);
          setFormData({ email: "", password: "", role: "service center" });
          alert("Service Center Registration Successful");
  }
  
     
   return (
     <div className="form">
       <h2>Service Center Registration</h2>
       <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type="text" id="name" placeholder="enter ur name" />
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
         <input type="contact" id="" placeholder="enter ur contact" />
         <label htmlFor="">Shopname</label>
         <input type="shopnmae" id="shopname" placeholder="enter ur shopname" />
         <label htmlFor="">Address</label>
         <input type="address" id="address" placeholder="enter ur address" />
         <button type="submit" >Register</button>
       </form>
     </div>
   );
 }
 export default ServiceCenterRegForm;    
  