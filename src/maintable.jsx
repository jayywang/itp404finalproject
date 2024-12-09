import React, { useState, useEffect } from "react";
import TripForm from "./tripform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    stateId: "",
    favoriteMemory: "",
    city: "",
    publicTransportation: "",
    attractions: "",
    foodPlaces: "",
  });
  const [trips, setTrips] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("/states");
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("/trips");
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const getStateName = (stateId) => {
    console.log("State ID:", stateId);
    const state = states.find((state) => String(state.id) === String(stateId));
    console.log("Found state:", state);
    return state ? state.name : "Unknown State";
  };

  const handleFormToggle = (trip = null) => {
    setShowForm(!showForm);
    if (trip) {
      setSelectedTrip(trip);
      setFormData({
        startDate: trip.startDate,
        endDate: trip.endDate,
        stateId: trip.stateId,
        favoriteMemory: trip.favoriteMemory,
        city: trip.city,
        publicTransportation: trip.publicTransportation,
        attractions: trip.attractions,
        foodPlaces: trip.foodPlaces,
      });
    } else {
      setSelectedTrip(null);
      setFormData({
        startDate: "",
        endDate: "",
        stateId: "",
        favoriteMemory: "",
        city: "",
        publicTransportation: "",
        attractions: "",
        foodPlaces: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = { ...formData };

    if (selectedTrip) {
      const updatedTrips = trips.map((trip) =>
        trip.id === selectedTrip.id ? { ...trip, ...tripData } : trip,
      );
      setTrips(updatedTrips);
      try {
        const response = await fetch(`/trips/${selectedTrip.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripData),
        });

        if (response.ok) {
          toast.success("Trip updated successfully!");
        } else {
          console.error("Failed to update trip:", response.status);
          toast.error("Failed to update trip.");
        }
      } catch (error) {
        console.error("Error updating trip:", error);
        toast.error("Error updating trip.");
      }
    } else {
      try {
        const response = await fetch("/trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripData),
        });

        if (response.ok) {
          const createdTrip = await response.json();
          setTrips([...trips, createdTrip]);
          setShowForm(false);
          toast.success("Trip added successfully!");
        } else {
          console.error(
            "Failed to add trip, server response:",
            response.status,
          );
          toast.error("Failed to add trip.");
        }
      } catch (error) {
        console.error("Error adding trip:", error);
        toast.error("Error adding trip.");
      }
    }
  };

  const handleDelete = async () => {
    if (selectedTrip) {
      const updatedTrips = trips.filter((trip) => trip.id !== selectedTrip.id);
      setTrips(updatedTrips);
      setShowForm(false);
      setSelectedTrip(null);

      try {
        const response = await fetch(`/trips/${selectedTrip.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Trip deleted successfully!");
        } else {
          console.error("Failed to delete trip:", response.status);
          toast.error("Failed to delete trip.");
        }
      } catch (error) {
        console.error("Error deleting trip:", error);
        toast.error("Error deleting trip.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>State</th>
            <th>Favorite Memory</th>
            <th>City</th>
            <th>Public Transportation</th>
            <th>Attractions</th>
            <th>Food Places</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.startDate}</td>
              <td>{trip.endDate}</td>
              <td>{getStateName(trip.stateId)}</td>
              <td>{trip.favoriteMemory}</td>
              <td>{trip.city}</td>
              <td>{trip.publicTransportation}</td>
              <td>{trip.attractions}</td>
              <td>{trip.foodPlaces}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleFormToggle(trip)}
                >
                  Edit Trip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => handleFormToggle()}
        >
          {showForm ? "Cancel" : "Add New Trip"}
        </button>
      </div>

      {showForm && (
        <div>
          <TripForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />

          {selectedTrip && (
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-danger me-2" onClick={handleDelete}>
                Delete Trip
              </button>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default MainTable;
