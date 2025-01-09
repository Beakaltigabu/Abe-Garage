// Import React library to use React features
import React from "react";
// Import ReactDOM to interact with the DOM
import ReactDOM from "react-dom/client";
// Import the main App component
import App from "./App.jsx";
// Import global CSS styles for the index file
import "./index.css";
// Import BrowserRouter for routing in the application
import { BrowserRouter } from "react-router-dom";

// Create a root element for rendering the React app
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the app in React.StrictMode for highlighting potential problems in the app
  <React.StrictMode>
    {/* Wrap the App component with BrowserRouter to enable routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
