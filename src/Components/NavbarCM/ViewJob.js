// src/components/JobDetailsTable.js
import React from "react";

const JobDetailsTable = ({ jobDetails }) => {
  return (
    <div className="job-details-container">
      <h3>Job Details</h3>
      <table className="job-details-table">
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{jobDetails?.jobName}</td>
            <td>{jobDetails?.description}</td>
            <td>{jobDetails?.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobDetailsTable;
