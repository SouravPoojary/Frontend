import React, { useEffect, useState } from "react";
import JobDetailsTable from "../NavbarCM/ViewJob";


const ViewAllAppointment = ({ onClose }) => {
  const [appointments, setAppointments] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedJobDetails, setSelectedJobDetails] = useState(null);



  useEffect(() => {
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments)

    
  }, []);

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
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
              <th>Expert</th>
              <th>Shopname</th>
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
                <td>{appointment.fullname}</td>
                <td>{appointment.shopname}</td>
                <td>{appointment.custname}</td>
                <td>{appointment.custno} </td>
                <td>{appointment.serviceDescription}</td>
                <td>{appointment.vehicleName}</td>
                <td>{appointment.regNo}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.notes}</td>
                <td>{appointment.status}</td>
                <td>{appointment.jobDetails?.amount || "—"}</td>
                <td>
                  <button
                    className="view-job"
                    onClick={() => handleViewJob(index)}
                  >
                    View Job
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
      {selectedJobDetails && (
        <JobDetailsTable jobDetails={selectedJobDetails} />
          )}
          
      {/* {editingIndex !== null && (
         <JobForm
           onSave={handleSaveJob}
          onCancel={() => setEditingIndex(null)}
        /> 
      )} */}

      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ViewAllAppointment;
