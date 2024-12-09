import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/Index";
import Root from "./routes/Root";
import State from "./routes/State";
import Map from "./routes/Map";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/states",
        element: <State />,
        loader() {
          return Promise.all([
            fetch("/states").then((response) => response.json()),
            fetch("/cities").then((response) => response.json()),
            fetch("/attractions").then((response) => response.json()),
            fetch("/food").then((response) => response.json()),
            fetch("/publicTransportation").then((response) => response.json()),
            fetch("/trips").then((response) => response.json()),
          ]).then(
            ([
              states,
              cities,
              attractions,
              food,
              publicTransportation,
              trips,
            ]) => {
              return {
                states,
                cities,
                attractions,
                food,
                publicTransportation,
                trips,
              };
            },
          );
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
