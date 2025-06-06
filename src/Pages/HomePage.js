import React, { use, useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Navbar from '../Components/Navbar/Navbar'
import ServiceCard from '../Components/NavbarSC/ServiceCard';
import "../Components/Styles/HomePage/HomePage.css";
import AppointmentForm from '../Components/NavbarCM/AppointmentForm';
import axios from 'axios';
export const HomePage = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
   const [selectedService, setSelectedService] = useState(null);
     
        useEffect(() => {
          const fetchServices = async () => {
            try {
              const response = await axios.get(
                "http://localhost:8080/service/getAll"
              );
              setServices(response.data);
              // console.log("Available services", response.data);
            } catch (error) {
              console.error("Error fetching services:", error);
            }
          };

          const loggedInUser =
            JSON.parse(localStorage.getItem("loggedInUser")) || null;
          if (loggedInUser) {
            setUserData(loggedInUser);
          }
          fetchServices();
        }, []);
  
   const handleBookClick = (service) => {
     setSelectedService(service);
     setShowForm(true);
   };

  //  const handleAppointmentSubmit = (data) => {
  //    // You can send `data` to backend or store
  //    console.log("Appointment submitted:", data);
  //    setShowForm(false); // close modal after submit
  // };
  
  return (
    <Layout navbar={<Navbar />}>
      <section className="hero">
        <div className="hero-content">
          <p className="highlight">BOOK YOUR SLOT NOW</p>
          <h1>TOP-NOTCH CARE</h1>
          <p className="subtext">
            Service your Vehicles, Starting at just <span>&#8377;499/-</span>
          </p>
          <a href="#" className="cta">
            🔧 Book Appointment now...
          </a>
        </div>
        <div className="hero-image">
          <img src="images.jpg" alt="Motorbike" />
        </div>
      </section>

      <div className="service-container">
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard key={index} service={service} userData={userData}
            onBookClick={handleBookClick}

            />
          ))
        ) : (
          <p>No services</p>
        )}
      </div>

      {/* {showForm && services && (
        <AppointmentForm
          service={selectedService}
          onClose={() => setShowForm(false)}
          
          onSubmit={handleAppointmentSubmit}
          
        />
      )} */}
    </Layout>
  );
}
