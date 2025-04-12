import React, { useEffect, useState } from "react";
import JobForm from "./JobForm";
 import "../Styles/Customer/ViewAppointment.css";

const ViewAppointmentSC = ({ onClose }) => {
    const [appointments, setAppointments] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

 

  useEffect(() => {
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    const loggedInServiceCenter =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (loggedInServiceCenter) {
      const serviceCenterAppointments = storedAppointments.filter(
        (appointment) => appointment.serviceCenterId === loggedInServiceCenter.serviceCenterId
      );
      setAppointments(serviceCenterAppointments);
    }
  }, []);


  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    };
    
      const handleStatusChange = (index, newStatus) => {
        const updatedAppointments = [...appointments];
        updatedAppointments[index].status = newStatus;
        setAppointments(updatedAppointments);
        localStorage.setItem(
          "appointments",
          JSON.stringify(updatedAppointments)
        );
    };
    
     const handleOpenForm = (index) => {
       setEditingIndex(index);
    };
    
     const handleSaveJob = (formData) => {
       if (editingIndex !== null) {
         const updatedAppointments = [...appointments];

         // Store full job details in local storage
         updatedAppointments[editingIndex].jobDetails = {
           jobName: formData.jobName,
           description: formData.description,
           amount: formData.amount,
         };

         setAppointments(updatedAppointments);
         localStorage.setItem(
           "appointments",
           JSON.stringify(updatedAppointments)
         );
         setEditingIndex(null); // Close form
       }
     };

  return (
    <div className="appointment-container">
      <h2>My Appointments</h2>
      {appointments.length > 0 ? (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Service Category</th>
              <th>Customer Name</th>
              <th>Customer Contact</th>
              <th>Description</th>
              <th>Vehicle Name</th>
              <th>Registration No.</th>
              <th>Date</th>
              <th>Time</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Job Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.serviceName}</td>
                <td>{appointment.serviceCategory}</td>
                <td>{appointment.custname}</td>
                <td>{appointment.custno} </td>
                <td>{appointment.serviceDescription}</td>
                <td>{appointment.vehicleName}</td>
                <td>{appointment.regNo}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.notes}</td>
                <td>
                  <select
                    value={appointment.status || "Pending"}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{appointment.jobDetails?.amount || "—"}</td>
                <td>
                  <button
                    className="job-card-btn"
                    onClick={() => handleOpenForm(index)}
                  >
                    Add Job
                  </button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
      {editingIndex !== null && (
        <JobForm
          onSave={handleSaveJob}
          onCancel={() => setEditingIndex(null)}
        />
          )}
          
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ViewAppointmentSC;
