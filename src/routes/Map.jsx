import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as d3 from "d3";
import InfoCard from "../infocards"; 

export default function Map() {
  const location = useLocation();
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const [bookmarkedStates, setBookmarkedStates] = useState(
    location.state?.bookmarkedStates || [],
  );

  useEffect(() => {
    if (!location.state?.bookmarkedStates) {
      const fetchBookmarkedStates = async () => {
        const response = await fetch("http://localhost:5000/states");
        const states = await response.json();
        const bookmarked = states.filter((state) => state.bookmarked);
        setBookmarkedStates(bookmarked);
      };

      fetchBookmarkedStates();
    }
  }, [location.state]);

  useEffect(() => {
    const width = 960;
    const height = 600;

    const projection = d3
      .geoAlbersUsa()
      .scale(1200)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    d3.json(
      "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/united-states.geojson",
    )
      .then((data) => {
        const svg = d3
          .select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .style("background-color", "#fff")
          .style("display", "block")
          .style("margin", "auto");

        svg
          .selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "state")
          .style("fill", "#ccc") 
          .style("stroke", "#fff")
          .style("stroke-width", 1)
          .on("click", (event, d) => {
            d3.select(event.target).style("fill", "#00BFFF");
          });
      })
      .catch((error) => {
        console.error("Error loading the GeoJSON data: ", error);
      });
  }, []);

  return (
    <div className="map-page">
      <h1 className="text-center mb-4">Bookmarked States</h1>
      <div
        className="map-container"
        style={{
          height: "600px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg ref={svgRef}></svg>
      </div>
      <div className="container mt-4">
        {bookmarkedStates.length === 0 ? (
          <p className="text-center">No states bookmarked yet.</p>
        ) : (
          <div className="row">
            {bookmarkedStates.map((state) => (
              <div key={state.id} className="col-12 col-md-6 col-lg-4">
                <InfoCard
                  title={`${state.name} (${state.abbreviation})`}
                  info={
                    <>
                      <p>
                        <strong>Capital:</strong> {state.capital}
                      </p>
                      {state.bookmarkDate && (
                        <p>
                          <strong>Bookmarked on:</strong>{" "}
                          {new Date(state.bookmarkDate).toLocaleString()}
                        </p>
                      )}
                    </>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/states")}>
          Back to States
        </button>
      </div>
    </div>
  );
}
