import React, { useState } from "react";

const JobForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    jobName: "",
    description: "",
    amount: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="job-form">
      <h3>Enter Job Details</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="jobName"
          value={formData.jobName}
          onChange={handleChange}
          placeholder="Job Name"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default JobForm;
