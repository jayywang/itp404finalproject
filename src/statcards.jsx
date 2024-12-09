import React from "react";

export default function StatCard(props) {
  return (
    <div className="card p-3 mb-4" style={props.cardStyle}>
      {" "}
      <div className="d-flex flex-column h-100">
        <h5>
          {props.state.name} ({props.state.abbreviation})
        </h5>
        <p>State Capital: {props.state.capital}</p>

        {props.city && props.city.length > 0 && (
          <>
            <h6>Cities:</h6>
            <ul>
              {props.city.map((city) => (
                <li key={city.id}>{city.name}</li>
              ))}
            </ul>
          </>
        )}

        {props.attractions && props.attractions.length > 0 && (
          <>
            <h6>Attractions:</h6>
            <ul>
              {props.attractions.map((attraction) => (
                <li key={attraction.id}>
                  {attraction.name} (Cost: ${attraction.cost})
                </li>
              ))}
            </ul>
          </>
        )}

        {props.food && props.food.length > 0 && (
          <>
            <h6>Food Places:</h6>
            <ul>
              {props.food.map((foodItem) => (
                <li key={foodItem.stateID}>{foodItem.restaurants}</li>
              ))}
            </ul>
          </>
        )}

        {props.publicTransportation && (
          <>
            <h6>Public Transportation:</h6>
            <p>
              {props.publicTransportation.name} (Cost:{" "}
              {props.publicTransportation.cost})
            </p>
          </>
        )}
      </div>
    </div>
  );
}
