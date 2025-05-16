import React, { useState } from "react";

const ReportForm = ({ onSubmit }) => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(location, description);
    setLocation("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem" }}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem" }}
        required
      />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
