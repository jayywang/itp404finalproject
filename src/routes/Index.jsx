import React, { useState } from "react";
import InfoCard from "../infocards";
import MainTable from "../maintable"; 

export default function Index() {
  const [formData, setFormData] = useState([]);

  const handleSubmit = (newTripData) => {
    console.log("Form Data Submitted:", newTripData);

    setFormData((prevData) => [...prevData, newTripData]);
  };

  return (
    <div className="map-page">
      <InfoCard
        title="Welcome to your Travel Tracker!"
        info="Keep track of all your past and future trips. Log your adventures, view details about the 50 states, and bookmark where you want to visit."
      />
      <MainTable data={formData} />
    </div>
  );
}
