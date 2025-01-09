// Import React library to use React features
import React from "react";

// Import global CSS styles for the app
import "./App.css";

// Import routing components from react-router-dom
import { Routes, Route } from "react-router-dom";



// Import UserProvider to provide user context throughout the app
import { UserProvider } from "./context/userContext";



// Define the main App component
function App() {
  return (
    // Wrap the app with UserProvider to make user context available to all components
    <UserProvider>
      {/* Render the Header component on every page */}
      <Header />
      {/* Define the routes for different pages in the app */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        {/* Route for the contact us page */}
        <Route path="/contactus" element={<ContactUs />} />
        {/* Route for the about us page */}
        <Route path="/aboutus" element={<AboutUs />} />
        {/* Route for the services page */}
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
      </Routes>
      {/* Render the Footer component on every page */}
      <Footer />
    </UserProvider>
  );
}

// Export the App component as the default export
export default App;
