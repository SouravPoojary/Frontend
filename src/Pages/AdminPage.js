import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Navbaram from "../Components/NavbarAM/Navbaram"
import ServiceCard from '../Components/NavbarSC/ServiceCard';
import axios from 'axios';
 
const AdminPage = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const storedServices = JSON.parse(localStorage.getItem("services"));
    // console.log("ss", storedServices);
    // if (Array.isArray(storedServices)) {
    //   setServices(storedServices);
    // } else {
    //   setServices([]);
    // }
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
    fetchServices();

    // const loggedInUser =
    //   JSON.parse(localStorage.getItem("storedUser")) || null;
    // console.log("Logged in User:", loggedInUser);
    // if (loggedInUser) {
    //   setUserData(loggedInUser);
    // }
  }, []);

  return (
    <Layout navbar={<Navbaram setServices={setServices} />}>
      <section className="hero">
        <div className="hero-content">
          <p className="highlight">BOOK YOUR SLOT NOW</p>
          <h1>TOP-NOTCH CARE</h1>
          <p className="subtext">
            Service your Vehicles, Starting at just <span>&#8377;299/-</span>
          </p>
          <a href="#" className="cta">
            🔧 Book Appointment now...
          </a>
        </div>
        <div className="hero-image">
          <img src="images.jpg" alt="Motorbike" />
        </div>
      </section>
      {/* <div className="service-container">
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard key={index} service={service} userData={userData} />
          ))
        ) : (
          <p>No services</p>
        )}
      </div> */}
    </Layout>
  );
};
export default AdminPage;