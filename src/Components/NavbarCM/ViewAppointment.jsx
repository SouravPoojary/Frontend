import React, { useEffect, useState } from "react";
import JobDetailsTable from "./ViewJob";
import "../Styles/Customer/ViewAppointment.css";
import axios from "axios";

const ViewAppointment = ({ onClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);

  useEffect(() => async () => {
    
    const storedAppointments = await axios.get(
      "http://localhost:8080/appointment/getAll"
    );
    const storedappntmnt = Object.values(storedAppointments.data)
    // JSON.parse(localStorage.getItem("appointments")) || [];
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (loggedInUser) {
      const userAppointments = storedappntmnt.filter(
        (appointment) => appointment.customerId?.id === loggedInUser.id
      );
      setAppointments(userAppointments);
      console.log("app", userAppointments)
    }
  }, []);


  const handleDelete = async (id) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    await axios.delete(`http://localhost:8080/appointment/delete/${id}`, {
      headers: { userId: loggedInUser.id },
    })
    const response = await axios.get(
      "http://localhost:8080/appointment/getAll"
    );
    setAppointments(response.data);
    //  const updatedAppointments = appointments.filter((_, i) => i !== id);
    //  setAppointments(updatedAppointments);
    // localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };


  const handleViewJob = (index) => {
    const jobDetails = appointments[index].jobDetails;
    setSelectedJobDetails(jobDetails); // Set the job details to show the job table
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
              <th>Shopname</th>
              <th>Expert</th>
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
                <td>{appointment.serviceId.serviceName}</td>
                <td>{appointment.serviceId.category}</td>
                <td>{appointment.serviceId.serviceCenterId.shopname}</td>
                <td>{appointment.serviceId.serviceCenterId.fullname}</td>
                <td>{appointment.vehicleName}</td>
                <td>{appointment.regNo}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.description}</td>
                <td>{appointment.status || "Pending"} </td>
                <td>{appointment.jobDetails?.amount || "—"}</td>
                <td>
                  <button
                    className="view-job-btn"
                    onClick={() => handleViewJob(index)}
                  >
                    View Job
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
      {selectedJobDetails && (
        <JobDetailsTable jobDetails={selectedJobDetails} />
      )}
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ViewAppointment;
