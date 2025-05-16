import React from "react";

const ReportList = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return <p>No reports yet.</p>;
  }

  return (
    <ul>
      {reports.map((r, i) => (
        <li key={i}>
          <strong>{r.location}</strong> — {r.description}
        </li>
      ))}
    </ul>
  );
};

export default ReportList;
