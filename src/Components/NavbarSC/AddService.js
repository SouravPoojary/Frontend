import React, { useEffect, useState } from "react";
import "../Styles/ServiceCenter/ServiceForm.css";
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";

const AddService = ({serviceCenter}) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    category: "",
    deliveryTime: "",
    minPrice: "",
    serviceCenterId: serviceCenter ? { id: serviceCenter.id } : null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = useAuth();

  useEffect(() => {
    // This will run when the component mounts
    // You can add any initialization logic here if needed
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form data
      if (!formData.serviceName || !formData.category || !formData.minPrice) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare the service data with the service center ID from the authenticated user
      const serviceData = {
        ...formData,
        minPrice: parseFloat(formData.minPrice), // Ensure it's a number
      };

      // Make the API call with JWT token in headers
      const response = await axios.post(
        "http://localhost:8080/service/create",
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Reset form on success
      setFormData({
        serviceName: "",
        description: "",
        category: "",
        deliveryTime: "",
        minPrice: "",
        serviceCenterId:""
      });

      alert("Service added successfully!");
    } catch (err) {
      console.error("Error adding service:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to add service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

//   const [userData, setUserData] = useState({});
//   const [serviceId, setServiceId] = useState(null);

//   useEffect(() => async()=>{
//     const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
//     // console.log("loggeduser",loggedInUser)
//     if (loggedInUser) {
//       setUserData(loggedInUser);
//     }

//     // Retrieve service center ID from user data
//     // const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const existingUsers = await axios.get("http://localhost:8080/admin/service-centers");
//     const existing=Object.values(existingUsers)
//     const currentUser = existing.find(
//       (user) => user.email === loggedInUser.email
//     );

//     if (currentUser) {
//       console.log("Current User Found:", currentUser); // Debugging
//       console.log("Service Center ID:", currentUser.serviceCenterId);
//       // setServiceId(currentUser.serviceCenterId); // Assign serviceCenterId as serviceId
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     console.log("id",serviceCenter.serviceCenterId)
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();

    
// console.log("formdata",formData)
//     //  const serviceWithUserData = {
//     //       ...formData,
//     //    serviceCenterId: formData.serviceCenterId || { id: userData.serviceCenterId } ,
//     //    // serviceId: serviceId,// Ensure the service ID is same for all services of this center
//     //    // //
//     //    // shopname: userData?.shopname || "Unknown",
//     //    // fullname: userData?.fullname || "Unknown",
//     //    // address: userData?.address || "Unknown",
//     //    // contact: userData?.contact || "Unknown",
//     //  };

//     console.log("Saving Service:", formData.serviceCenterId);

//     // const updatedServices = [...existingServices, serviceWithUserData];
//     // localStorage.setItem("services", JSON.stringify(updatedServices));

//     await axios.post("http://localhost:8080/service/create",formData);

  //   setFormData({
  //     serviceName: "",
  //     description: "",
  //     category: "",
  //     deliveryTime: "",
  //     minPrice: "",
  //     serviceCenterId:""
  //   });

  //   alert("Service Added Successfully!");
  // };

  return (
    <div className="form">
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Service Name", name: "serviceName", type: "text" },
          {
            label: "Service Description",
            name: "description",
            type: "text",
          },
          { label: "Service Category", name: "category", type: "text" },
          { label: "Delivery Time", name: "deliveryTime", type: "text" },
          { label: "Price", name: "minPrice", type: "text" },
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
