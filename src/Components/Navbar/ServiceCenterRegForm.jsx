import React from 'react'
import "../Styles/Forms.css"
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceCenterRegForm = ( {onRegister,hideForm}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    shopname: "",
    address: "",
    // role:"SERVICE_CENTER",
    // serviceCenterId: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev)=>({ ...prev, [id]: value }));
  }

        

  const handleSubmit = async (event) => {
    event.preventDefault();
    //  event.stopPropagation();

    // Prevent multiple submissions
    //  if (isSubmitting) return;

    //  setIsSubmitting(true);
    //  setError("");
         
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register/service-center",
        formData
      );
      console.log("User saved:", response.data);
      onRegister(response.data);
      hideForm();
      alert("Registration successful! Please login.");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || 'Registration failed');
    }
  
    // Auto-login after registration
    //  const loginResponse = await axios.post(
    //    "http://localhost:8080/auth/login",
    //    {
    //      email: formData.email,
    //      password: formData.password,
    //      role: "SERVICE_CENTER",
    //    }
    //  );
    //  localStorage.setItem("jwtToken", loginResponse.data.token);
    //  localStorage.setItem("userRole", "SERVICE_CENTER");
    //  localStorage.setItem(
    //    "userData",
    //    JSON.stringify(loginResponse.data.user)
    //  );
    //  // onRegister(updatedUser);
    //  hideForm();
    //  onRegister(loginResponse.data.user);
    //  navigate("/service-center");
    //  alert("Service Center Registration and Login Successful");

    setFormData({
      fullname: "",
      email: "",
      password: "",
      contact: "",
      shopname: "",
      address: "",
      role: "SERVICE_CENTER",
    });
  }
          
      //    } catch (error) {
      //      console.error("Error saving user:", error);
      //      setError(error.response?.data?.message || "Registration failed");
      //    } finally {
      //      setIsSubmitting(false);
      //    }

      //   //  alert("Service Center Registration Successful");
      //  };
  
     
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
         <button type='submit' disabled={isSubmitting} >Register</button>
       </form>
     </div>
   );
 }
 export default ServiceCenterRegForm;    
  