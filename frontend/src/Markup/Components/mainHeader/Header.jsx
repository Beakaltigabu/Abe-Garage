import React from "react"; // Import the React library to use JSX and React components
import TopHeader from "../topHeader/TopHeader"; // Import the TopHeader component from the specified path
import LowerHeader from "../lowerHeader/LowerHeadder"; // Import the LowerHeader component from the specified path

// Define a functional component named Header
function Header() {
  return (
    <>
      {/* Render the TopHeader component */}
      <TopHeader />

      {/* Render the LowerHeader component */}
      <LowerHeader />
    </>
  );
}

// Export the Header component as the default export of this module
export default Header;
