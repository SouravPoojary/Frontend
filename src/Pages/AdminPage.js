import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Navbaram from "../Components/NavbarAM/Navbaram"
import ServiceCard from '../Components/NavbarSC/ServiceCard';
 
const AdminPage = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services"));
    console.log("ss", storedServices);
    if (Array.isArray(storedServices)) {
      setServices(storedServices);
    } else {
      setServices([]);
    }

    const loggedInUser =
      JSON.parse(localStorage.getItem("storedUser")) || null;
    console.log("Logged in User:", loggedInUser);
    if (loggedInUser) {
      setUserData(loggedInUser);
    }
  }, []);

  return (
    <Layout navbar={<Navbaram setServices={setServices} />}>
      <h2>body</h2>
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
};
export default AdminPage;