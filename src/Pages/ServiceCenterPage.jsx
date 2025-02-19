import React,{useEffect, useState} from "react";
import Layout from "../Components/Layout";
import Navbarsc from "../Components/NavbarSC/Navbarsc"
import ServiceCard from "../Components/NavbarSC/ServiceCard";


const ServiceCenterPage = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) ;
  
    if (Array.isArray(storedServices)) {
      setServices(storedServices)
    } else {
      setServices([]);
    }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    // console.log("Logged in User:", loggedInUser);
    if (loggedInUser) {
      setUserData(loggedInUser);

      localStorage.setItem("storedUser", JSON.stringify(loggedInUser))
      // console.log(
      //   "Stored User Data Set:",
      //   localStorage.getItem("storedUser")
      // );
    }
}, []);
  
  return (
    <Layout navbar={<Navbarsc setServices={setServices} />}>
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
export default ServiceCenterPage;
