import React, { useEffect, useState } from "react";
import "../Styles/Customer/AppointmentForm.css";

const AppointmentForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
    vehicleName: "",
    regNo: "",
  });

  const[user,setUser]=useState(false)
   
  
    useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
     
      if (loggedInUser) {
        setUser(loggedInUser);
      }
     
    },[]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
     console.log("user", user);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentDetails = {
      userId: user.userId,
      serviceCenterId:service.serviceId,
      serviceName: service.serviceName,
      serviceDescription:service.serviceDescription ,
      serviceCategory: service.serviceCategory,
      deliveryTime:service.deliveryTime ,
      price: service.price,
      shopname:service.shopname,
      fullname: service.fullname,
      custno: user.contact,
      custname:user.fullname,
      ...formData,
    };
    console.log("Appointments", appointmentDetails);

    // Save to localStorage
    const existingAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingAppointments, appointmentDetails])
    );

    // Update the parent component (navbar)
    // onAppointmentSubmit(appointmentDetails);

    alert("Appointment booked successfully!");
    onClose();
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-content">
        <h3>Book an Appointment for {service.serviceName}</h3>
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
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Preferred Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <label>Additional Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any specific requests"
          ></textarea>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
