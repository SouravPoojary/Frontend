import React, { useEffect, useState } from "react";
import JobForm from "./JobForm";
 import "../Styles/Customer/ViewAppointment.css";
import axios from "axios";

const ViewAppointmentSC = ({ onClose }) => {
    const [appointments, setAppointments] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

 

  useEffect(() => {
    const fetchAppointments = async () => {
      const storedAppointments = await axios.get(
        "http://localhost:8080/appointment/getAll"
      );
      const storedappntmnt = Object.values(storedAppointments.data);
      // JSON.parse(localStorage.getItem("appointments")) || [];
      const loggedInServiceCenter =
        JSON.parse(localStorage.getItem("loggedInUser")) || null;

      if (loggedInServiceCenter) {
        const serviceCenterAppointments = storedappntmnt.filter(
          (appointment) => appointment.serviceId?.serviceCenterId?.id === loggedInServiceCenter.id
        );
        setAppointments(serviceCenterAppointments);
      }
    }
    fetchAppointments()
  },[]);


  const handleDelete = async (id) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    await axios.delete(`http://localhost:8080/appointment/delete/${id}`, {
      // const updatedAppointments = appointments.filter((_, i) => i !== index);
      headers: {
        userId: loggedInUser.id,
      role:loggedInUser.role
    },
    })
      const response = await axios.get(
        "http://localhost:8080/appointment/getAll"
      );
    // setAppointments(response.data)
    setAppointments((prev) => 
       Array.isArray(prev)? prev.filter((appointment) => appointment.id !== id)
         : []
      // prev.filter((appointment) => appointment.id !== id);
    );
    // localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    };
    
  const handleStatusChange = async (index,id, newStatus) => {
         const response = await axios.put(
           `http://localhost:8080/appointment/${id}/status`,
           { status: newStatus },
           { headers: { "Content-Type": "application/json" } }
         );
        const updatedAppointments = [...appointments];
        updatedAppointments[index].status = response.data.status;
        setAppointments(updatedAppointments);
        // localStorage.setItem(
        //   "appointments",
        //   JSON.stringify(updatedAppointments)
        // );
    };
    
     const handleOpenForm = (index) => {
       setEditingIndex(index);
        console.log("Opening form for index:", index);
    };
    
     const handleSaveJob = async(formData) => {
       if (editingIndex !== null) {
         
         const selectedAppointment = appointments[editingIndex];
          console.log("Selected Appointment: ", selectedAppointment);
          // console.log("Form Data: ", formData);
        //  const updatedAppointments = [...appointments];

         // Store full job details in local storage
        //  updatedAppointments[editingIndex].jobDetails = {
        //    jobName: formData.jobName,
        //    description: formData.description,
        //    amount: formData.amount,
        //  };

         const app = await axios.put(`http://localhost:8080/appointment/addJob/${selectedAppointment.id}`,
           {
             jobDetails: {
               jobName: formData.jobName,
               description: formData.description,
               amount: formData.amount,
             },
           }
         )

         if (app.status === 200) {
             const updatedAppointments = [...appointments];
             updatedAppointments[editingIndex] = app.data;
              // updatedAppointments[editingIndex] = {
              //   ...selectedAppointment,
              //   jobDetails: app.data, // Update the jobDetails in the appointment
              // };
           setAppointments(updatedAppointments);
             setEditingIndex(null);
         }

        //  setAppointments(updatedAppointments);
        //  localStorage.setItem(
        //    "appointments",
        //    JSON.stringify(updatedAppointments)
        //  );
        //  setEditingIndex(null); // Close form
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
              <tr key={appointment.id}>
                <td>{appointment.serviceId.serviceName}</td>
                <td>{appointment.serviceId.category}</td>
                <td>{appointment.customerId.fullname}</td>
                <td>{appointment.customerId.contact} </td>
                <td>{appointment.serviceId.description}</td>
                <td>{appointment.vehicleName}</td>
                <td>{appointment.regNo}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.description}</td>
                <td>
                  <select
                    value={appointment.status || "Pending"}
                    onChange={(e) => handleStatusChange(index,appointment.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    {/* <option value="In Progress">In_Progress</option> */}
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
                    onClick={() => handleDelete(appointment.id)}
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
