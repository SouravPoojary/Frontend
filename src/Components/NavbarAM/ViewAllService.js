import React, { useEffect, useState } from 'react'
import "../Styles/ServiceCenter/ServiceTable.css"

const ViewAllService = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServices(storedServices);

  }, []);

  const handleDelete = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
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
            <th>Expert</th>
            <th>Shopname</th>
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
              <td>{service.fullname}</td>
              <td>{service.shopname}</td>
              <td>{service.deliveryTime}</td>
              <td>{service.price}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(index)}>
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
export default ViewAllService;