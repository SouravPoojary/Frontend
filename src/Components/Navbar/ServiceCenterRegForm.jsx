import React from 'react'
import "../Styles/Forms.css"
import { useState } from 'react'

const ServiceCenterRegForm = ( {onRegister,hideForm}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    shopname: "",
    address: "",
    role: "service center",
    serviceCenterId:null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev)=>({ ...prev, [id]: value }));
  }

        const handleSubmit = (event) => {
          event.preventDefault();
          hideForm();
          const existingUser = JSON.parse(localStorage.getItem("users")) || [];

          let lastUserId = 0;
          if (existingUser.length > 0) {
            const lastUser = existingUser[existingUser.length - 1];
            lastUserId = Number(lastUser?.serviceCenterId) || 0; // Ensure it's a number
          }

          const newUserId = lastUserId + 1; // Increment user ID
          // console.log("New User ID:", newUserId); // Debugging


          // const newUserId = existingUser.length
          //   ? Number(existingUser[existingUser.length - 1].serviceCenterId) + 1
          //   : 1;
          
          const updatedUser = { ...formData, serviceCenterId: newUserId }; // Assign userId
          const newUsersList = [...existingUser, updatedUser];
          localStorage.setItem("users", JSON.stringify(newUsersList));

          onRegister(updatedUser);

          // const updatedUser = [...existingUser, formData]

          // localStorage.setItem("users", JSON.stringify(updatedUser))

          // onRegister(formData);
          setFormData({
            fullname: "",
            email: "",
            password: "",
            contact: "",
            shopname: "",
            address: "",
            role: "service center",
            serviceCenterId: null,
          });
          alert("Service Center Registration Successful");
        };
  
     
   return (
     <div className="form">
       <h2>Service Center Registration</h2>
       <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type="text"
           id="fullname"
           placeholder="enter ur name"
           value={formData.fullname}
           onChange={handleChange} />
         
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
         <input type="contact"
           id="contact"
           placeholder="enter ur contact"
           value={formData.contact}
           onChange={handleChange}
required
         />
         <label htmlFor="">Shopname</label>
         <input type="text"
           id="shopname"
           placeholder="enter ur shopname"
           value={formData.shopname}
           onChange={handleChange}
         required
           
         />
         <label htmlFor="">Address</label>
         <input type="address"
           id="address"
           placeholder="enter ur address"
           value={formData.address}
           onChange={handleChange}
           required
         />
         <button type="submit" >Register</button>
       </form>
     </div>
   );
 }
 export default ServiceCenterRegForm;    
  