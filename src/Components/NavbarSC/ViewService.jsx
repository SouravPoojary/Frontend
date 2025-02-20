import React, { useEffect, useState } from 'react'
import "../Styles/ServiceCenter/ServiceTable.css"

const ViewService = () => {
  const [services, setServices] = useState([]);
  // const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServices(storedServices);

    const loggedInServiceCenter =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;
    
    if (loggedInServiceCenter) {
      const serviceCenterServices = storedServices.filter(
        (service) =>
          service.serviceId === loggedInServiceCenter.serviceCenterId
      );
      setServices(serviceCenterServices);
    }

    //  const loggedInUser =JSON.parse(localStorage.getItem("loggedInUser")) || null;
    //  setUserData(loggedInUser);
  }, []);

  const handleDelete = (serviceid,servicename) => {
    // const updatedServices = services.filter((_, i) => i !== index);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
    const updatedServices = storedServices.filter(
      (service) => !(service.serviceId === serviceid && service.serviceName===servicename && service.shopname===loggedInUser.shopname) 
    );
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  return (
    <div>
      <table className="view-service">
        <thead className="head">
          <tr>
            <th>Service Name</th>
            <th>Service Description</th>
            <th>Service Category</th>
            <th>Delivery Time</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="body">
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.serviceName}</td>
              <td>{service.serviceDescription}</td>
              <td>{service.serviceCategory}</td>
              <td>{service.deliveryTime}</td>
              <td>{service.price}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(service.serviceId,service.serviceName)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ViewService;