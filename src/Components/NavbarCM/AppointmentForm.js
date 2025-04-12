import React, { useEffect, useState } from "react";
import "../Styles/Customer/AppointmentForm.css";
import axios from "axios";

const AppointmentForm = ({ service,userData, onClose }) => {
  const [formData, setFormData] = useState({
    vehicleName: "",
    regNo: "",
    description: "",
    appointmentDate: "",
    appointmentTime: "",
    status:"Pending",

    serviceId: service ? { id: service.id } : null,
    customerId:userData?{id:userData.id}:null,
  });

  const[user,setUser]=useState(false)
   
  
    useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
     
      if (loggedInUser) {
        setUser(loggedInUser);
      }
     
    }, []);
  
  // useEffect(() => {
  //   if (service) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       serviceId: { serviceId: service.serviceId }, // ✅ Update only when service is available
  //     }));
  //   }
  // }, [service]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    //  console.log("user", user);
    
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentDetails = {
      // userId: user.userId,
      // serviceCenterId:service.id,
      // serviceName: service.serviceName,
      // serviceDescription:service.serviceDescription ,
      // serviceCategory: service.serviceCategory,
      // deliveryTime:service.deliveryTime ,
      // price: service.price,
      // shopname:service.shopname,
      // fullname: service.fullname,
      // userid:user.id,
      // custno: user.contact,
      // custname: user.fullname,
      // custaddress:user.address,
      ...formData,
    };
    console.log("Appointments", appointmentDetails);

    // Save to localStorage
   
    // const existingAppointments = axios.get("http://localhost:8080/appointment/getAll" );
      // JSON.parse(localStorage.getItem("appointments")) || [];
    // localStorage.setItem(
    //   "appointments",
    //   JSON.stringify([...existingAppointments, appointmentDetails])
    // );

   const finalappn=axios.post("http://localhost:8080/appointment/create",appointmentDetails);
console.log("final",finalappn)
    alert("Appointment booked successfully!");
    onClose();
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-content">
        <h3>Book an Appointment</h3>
        <p className="service-name">{service.serviceName}</p>

        <form onSubmit={handleSubmit}>
          <label>Vehicle Name:</label>
          <input
            type="text"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            required
          />

          <label>Registration No:</label>
          <input
            type="text"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            required
          />

          <label>Preferred Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />

          <label>Preferred Time:</label>
          <input
            type="time"
            step="60"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />

          <label>Additional Notes:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter any specific requests"
          ></textarea>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button type="button" className="cancel-btn"  onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
