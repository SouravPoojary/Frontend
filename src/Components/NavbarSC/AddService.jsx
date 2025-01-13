import React, { useState } from 'react'
import '../Styles/ServiceCenter/ServiceForm.css';
const AddService = ({ onAddService }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    serviceCategory: '',
    deliveryTime: '',
    price:'',
   })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,[name]:value,
      }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(formData).every((field) => field.trim() !== '')) {
      onAddService(formData)
      setFormData({
      serviceName: '',
      serviceDescription: '',
      serviceCategory: '',
      deliveryTime:'',
      price: '',
      
      })
    }
  }
  return (

    <div className="form">
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Service Name", name: "serviceName", type: "text" },
          { label: "Service Description", name: "serviceDescription", type: "text" },
          { label: "Service Category", name: "serviceCategory", type: "text" },
          {label:'Delivery Time',name:'deliveryTime',type:'text'},
          { label: "Price", name: "price", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label> 
              {field.label}:
              <input 
                type={field.type}
                name={field.name}
                value={formData[field.name]}
              onChange={handleChange}
              />
              </label>
          </div>
        ))}
        <button type='submit'>Add Service</button>
      </form>
    </div>
    
  

  );
}
export default AddService;
