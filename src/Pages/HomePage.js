import React, { use, useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Navbar from '../Components/Navbar/Navbar'
import ServiceCard from '../Components/NavbarSC/ServiceCard';

export const HomePage = () => {
  const [services, setServices] = useState([]);
       const [userData, setUserData] = useState(null);
     
       useEffect(() => {
         const storedServices = JSON.parse(localStorage.getItem("services")) ;
        
         if (Array.isArray(storedServices)) {
           setServices(storedServices)
         } else {
           setServices([]);
         }
     
       const loggedInUser = JSON.parse(localStorage.getItem("storedUser")) || null;
        
         if (loggedInUser) {
           setUserData(loggedInUser);
         }
       }, []);
  return (
    <Layout navbar={<Navbar />}>
      <div className="service-container">
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard key={index} service={service} userData={userData} />
          ))
        ) : (
          <p>No services</p>
        )}
      </div>
    </Layout>
  );
}
