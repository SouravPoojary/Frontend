import React, { useEffect, useState } from "react";
import "../Styles/ServiceCenter/ServiceForm.css";

const AddService = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    serviceCategory: "",
    deliveryTime: "",
    price: "",
  });

  const [userData, setUserData] = useState({});
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    console.log("loggeduser",loggedInUser)
    if (loggedInUser) {
      setUserData(loggedInUser);
    }

    // Retrieve service center ID from user data
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = existingUsers.find(
      (user) => user.email === loggedInUser.email
    );

    if (currentUser) {
      console.log("Current User Found:", currentUser); // Debugging
      console.log("Service Center ID:", currentUser.serviceCenterId);
      setServiceId(currentUser.serviceCenterId); // Assign serviceCenterId as serviceId
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingServices = JSON.parse(localStorage.getItem("services")) || [];

    const serviceWithUserData = {
      ...formData,
      serviceId: serviceId, // Ensure the service ID is same for all services of this center
      shopname: userData?.shopname || "Unknown",
      fullname: userData?.fullname || "Unknown",
      address: userData?.address || "Unknown",
      contact: userData?.contact || "Unknown",
    };

    console.log("Saving Service:", serviceWithUserData);

    const updatedServices = [...existingServices, serviceWithUserData];
    localStorage.setItem("services", JSON.stringify(updatedServices));

    setFormData({
      serviceName: "",
      serviceDescription: "",
      serviceCategory: "",
      deliveryTime: "",
      price: "",
    });

    alert("Service Added Successfully!");
  };

  return (
    <div className="form">
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Service Name", name: "serviceName", type: "text" },
          {
            label: "Service Description",
            name: "serviceDescription",
            type: "text",
          },
          { label: "Service Category", name: "serviceCategory", type: "text" },
          { label: "Delivery Time", name: "deliveryTime", type: "text" },
          { label: "Price", name: "price", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label>
              {field.label}:
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
