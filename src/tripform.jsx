import React, { useState, useEffect } from "react";

export default function TripForm({ formData, setFormData, onSubmit }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await fetch("/path/to/states");
        const statesData = await statesResponse.json();
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="stateId" className="form-label">
            State
          </label>
          <select
            id="stateId"
            name="stateId"
            className="form-select"
            value={formData.stateId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Public Transportation</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="publicTransportationYes"
              name="publicTransportation"
              value="Yes"
              checked={formData.publicTransportation === "Yes"}
              onChange={handleInputChange}
            />
            <label
              className="form-check-label"
              htmlFor="publicTransportationYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="publicTransportationNo"
              name="publicTransportation"
              value="No"
              checked={formData.publicTransportation === "No"}
              onChange={handleInputChange}
            />
            <label
              className="form-check-label"
              htmlFor="publicTransportationNo"
            >
              No
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Is this your first trip to this state?
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="firstTrip"
            name="firstTrip"
            checked={formData.firstTrip}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="firstTrip">
            Yes, this is my first trip to this state.
          </label>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="attractions" className="form-label">
            Attractions
          </label>
          <input
            type="text"
            id="attractions"
            name="attractions"
            className="form-control"
            value={formData.attractions}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="foodPlaces" className="form-label">
            Food Places
          </label>
          <input
            type="text"
            id="foodPlaces"
            name="foodPlaces"
            className="form-control"
            value={formData.foodPlaces}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="favoriteMemory" className="form-label">
          Favorite Memory
        </label>
        <textarea
          id="favoriteMemory"
          name="favoriteMemory"
          className="form-control"
          rows="3"
          value={formData.favoriteMemory}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="startDate" className="form-label">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="form-control"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="endDate" className="form-label">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="form-control"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
