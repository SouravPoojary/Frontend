import React, { useEffect, useState } from "react";
import "../Styles/ServiceCenter/ServiceCard.css";
import AppointmentForm from "../NavbarCM/AppointmentForm";
const ServiceCard = ({ service, userData, onAppointmentSubmit }) => {
  //  console.log("Received userData in ServiceCard:", userData);
  // console.log("service",service)
  const [user, setUser] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleAppointmentClick = () => {
    if (user?.role === "customer") {
      setShowForm(true);
    } else {
      alert("Only customers can book an appointment!");
    }
  };

  return (
    <div className="service-card">
      <p>
        <strong>Service Name:</strong>
        {service.serviceName}
      </p>
      <p>
        <strong>Description:</strong>
        {service.serviceDescription}
      </p>
      <p>
        <strong>Category:</strong> {service.serviceCategory}
      </p>
      <p>
        <strong>Delivery Time:</strong> {service.deliveryTime}
      </p>
      <p>
        <strong>Price:</strong> {service.price}
      </p>

      {/* {userData ? ( */}
      {/* <> */}
      <p>
        <strong>Shop Name:</strong>
        {service.shopname}
      </p>
      <p>
        <strong>Expert:</strong>
        {service.fullname}
      </p>
      <p>
        <strong>Address:</strong>
        {service.address || "Not Available"}
      </p>
      <p>
        <strong>Contact:</strong>
        {service.contact}
      </p>

      <button className="appointment-btn" onClick={handleAppointmentClick}>
        Book Appointment
      </button>

      {showForm && (
        <AppointmentForm
          service={service}
          onClose={() => setShowForm(false)}
          onAppointmentSubmit={onAppointmentSubmit}
          userData={userData}
        />
      )}
    </div>
  );
};
export default ServiceCard;
