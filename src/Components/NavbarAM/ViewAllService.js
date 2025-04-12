import React, { useEffect, useState } from 'react'
import "../Styles/ServiceCenter/ServiceTable.css"
import axios from 'axios';

const ViewAllService = () => {
  const [services, setServices] = useState([]);
  // const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/service/getAll"
        );

        let data = response.data;

        //
        data = Object.values(data);

        // ✅ Store full services list
        setServices(data);

        // ✅ Filter for logged-in service center
        // const loggedInServiceCenter =
        //   JSON.parse(localStorage.getItem("loggedInUser")) || null;
        // console.log("🔍 Logged In Service Center:", loggedInServiceCenter);
        // if (loggedInServiceCenter) {
        //   const serviceCenterServices = data.filter(
        //     (service) =>
        //       service.serviceCenterId?.id === loggedInServiceCenter.id
        //   );

        //   setServices(serviceCenterServices);
        //   console.log("s", serviceCenterServices);
        // }
      } catch (error) {
        setServices([]); // Prevent empty UI crash
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    // const updatedServices = services.filter((_, i) => i !== index);
    
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(loggedInUser)
    try {
      await axios.delete(`http://localhost:8080/service/delete/${id}`, {
        headers: {
          userId: loggedInUser[0].id,
          role: loggedInUser[0].role
        }

        // Pass userId for authorization
      });

      // Fetch updated service list after deletion
      const response = await axios.get("http://localhost:8080/service/getAll");
      console.log("deleted", response.data);
      //  const servicez=Object.values(services)
      //  setServices(response.data)
      setServices((prevServices) =>
        //  Array.isArray(prevServices)
        //    ? prevServices.filter((service) => service.id !== id)
        //    : []
        prevServices.filter((service) => service.id !== id)
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }

    
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
         
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{service.category}</td>
                <td>{service.deliveryTime}</td>
                <td>{service.minPrice}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No services found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ViewAllService;