import React from "react";

export default function InfoCard({ title, info }) {
  return (
    <div className="card p-3 mb-4" style={{ backgroundColor: "#CEDCED" }}>
      <div className="d-flex flex-column">
        <h5>{title}</h5>
        <p>{info}</p>
      </div>
    </div>
  );
}
