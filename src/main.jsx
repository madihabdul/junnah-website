import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PublicSite from "./PublicSite.jsx";
import "./styles.css";
import "./audience.css";

const view = new URLSearchParams(window.location.search).get("view");

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {view === "demo" ? <App /> : <PublicSite />}
  </React.StrictMode>
);
