import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatCard from "../statcards";

export default function State() {
  const { cities, attractions, food, publicTransportation } = useLoaderData();
  const [statesData, setStatesData] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("http://localhost:5000/states");
        const data = await response.json();
        setStatesData(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleBookmark = (stateId) => {
    const updatedStates = statesData.map((state) =>
      state.id === stateId
        ? {
            ...state,
            bookmarked: !state.bookmarked,
            bookmarkDate: state.bookmarked ? null : new Date(),
          }
        : state,
    );

    setStatesData(updatedStates);

    const updatedState = updatedStates.find((state) => state.id === stateId);

    fetch(`http://localhost:5000/states/${stateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookmarked: updatedState.bookmarked,
        bookmarkDate: updatedState.bookmarkDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("State updated:", data);
      })
      .catch((error) => {
        console.error("Error updating state:", error);
      });
  };

  const handleViewBookmarks = () => {
    const bookmarkedStates = statesData.filter((state) => state.bookmarked);
    navigate("/map", { state: { bookmarkedStates } });
  };

  return (
    <div className="index-page">
      <h1 className="text-center mb-4">State List</h1>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {statesData
            .sort((a, b) => (a.bookmarked ? -1 : b.bookmarked ? 1 : 0)) 
            .map((state) => {
              const stateCities = cities.filter(
                (city) => city.stateId === state.id,
              );
              const stateAttractions = attractions.filter(
                (attraction) => attraction.stateId === state.id,
              );
              const stateFood = food.filter(
                (item) => item.stateId === state.id,
              );
              const statePublicTransportation = publicTransportation.find(
                (transport) => transport.stateId === state.id,
              );

              return (
                <div key={state.id} className="col-12 col-md-4 col-lg-3">
                  <StatCard
                    state={state}
                    city={stateCities}
                    attractions={stateAttractions}
                    food={stateFood}
                    publicTransportation={statePublicTransportation}
                  />
                  <button
                    className={`btn mt-2 ${state.bookmarked ? "btn-danger" : "btn-primary"}`}
                    onClick={() => handleBookmark(state.id)}
                  >
                    {state.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                  </button>
                  {state.bookmarked && (
                    <div className="mt-2">
                      <small>
                        Bookmarked on:{" "}
                        {new Date(state.bookmarkDate).toLocaleString()}
                      </small>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <button
          className="btn btn-secondary mt-4"
          onClick={handleViewBookmarks}
        >
          View Bookmarked States
        </button>
      </div>
    </div>
  );
}
