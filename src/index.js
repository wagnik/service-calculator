import React from "react";
import ReactDOM from "react-dom/client";

import { ServiceCalculator } from "./components/ServiceCalculator";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ServiceCalculator />
  </React.StrictMode>
);
