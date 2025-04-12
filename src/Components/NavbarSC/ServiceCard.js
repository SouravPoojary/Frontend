import React, { useEffect, useState } from "react";
import "../Styles/ServiceCenter/ServiceCard.css";
import AppointmentForm from "../NavbarCM/AppointmentForm";
import axios from "axios";
const ServiceCard = ({ service, onBookClick }) => {
  //  console.log("Received userData in ServiceCard:", userData);
  // console.log("service",service)
  const [user, setUser] = useState(false);
  const [serviceCenter, setServiceCenter] = useState(null);

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (loggedInUser) {
      setUser(loggedInUser);
    }
    // console.log(service.serviceCenterId)

    //   if (service.serviceCenterId) {

    //    const fetchServiceCenter = async () => {
    //      try {
    //        const response = await axios.get(
    //          "http://localhost:8080/service/getAll"
    //        );
    //         // console.log("API Response:", response.data);
    //        setServiceCenter(response.data);
    //      } catch (error) {
    //        console.error("Error fetching service center details:", error);
    //      }
    //    };
    //    fetchServiceCenter();
    //  }
  }, []);

  const handleAppointmentClick = () => {
    console.log("serv", service);
    if (user?.role === "CUSTOMER") {
      onBookClick(service);
    } else {
      alert("Only customers can book an appointment!");
    }
  };

  return (
    <div className="service-card">
      {/* Image Section */}
      <div className="service-image">
        <img
          src={service.image || "/assets/default-service.jpg"}
          alt={service.serviceName}
        />
      </div>

      {/* Service Details */}
      <div className="service-content">
        <h3>{service.serviceName}</h3>
        <p className="description">{service.description}</p>

        <div className="service-info">
          <p>
            <strong>Category:</strong>{" "}
            <span className="category">{service.category}</span>
          </p>
          <p>
            <strong>Delivery Time:</strong>{" "}
            <span className="delivery-time">{service.deliveryTime}</span>
          </p>
          <p>
            <strong>Min Price:</strong>{" "}
            <span className="price">₹{service.minPrice}</span>
          </p>
        </div>

        {/* Service Center Details */}
        <div className="service-center-info">
          <p>
            <strong>Shop Name:</strong>{" "}
            {service.serviceCenterId?.shopname || "N/A"}
          </p>
          <p>
            <strong>Expert:</strong>{" "}
            {service.serviceCenterId?.fullname || "N/A"}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {service.serviceCenterId?.address || "Not Available"}
          </p>
          <p>
            <strong>Contact:</strong>{" "}
            {service.serviceCenterId?.contact || "N/A"}
          </p>
        </div>

        {/* Book Appointment Button */}
        <button className="appointment-btn" onClick={handleAppointmentClick}>
          Book Appointment
        </button>

        {/* Appointment Form (Conditional Rendering) */}
      </div>
    </div>
  );
};
export default ServiceCard;
