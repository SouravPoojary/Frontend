import React, { useState } from 'react'
import '../Styles/ServiceCenter/ServiceForm.css';
const AddService = ({ hideForm }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    serviceCategory: '',
    deliveryTime: '',
    price:''
   })
    const handleSubmit = (event) => {
        event.preventDefault();
        hideForm();
    }
  return (
    
     <div className="form">
       <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
         <label>Service Name</label>
        <input type="text" />
        <label>Service Description</label>
         <input type="text" />
       <label>Service Categoty</label>
         <input type="text" />
    <label>Delivery Time</label>
         <input type="text" />
       <label>Price</label>
               <input type="text" />
               <button type='submit'>Add Service</button>
       </form>
     </div>
  );
}
export default AddService;
