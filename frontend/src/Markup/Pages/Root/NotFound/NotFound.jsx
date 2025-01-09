import React from "react"; // Imports React library for creating components
import { Link } from "react-router-dom"; // Imports Link component for navigation between routes
import classes from "./NotFound.module.css"; // Imports CSS module for styling the NotFound component

function NotFound() {
  // Defines the NotFound functional component
  return (
    <div className={classes.wrapper}>
      {" "}
      {/* Container div with a CSS class from NotFound.module.css */}
      <div className="text-left">
        {" "}
        {/* Div for text alignment, aligns text to the left */}
        <h4>Sorry, the page you are looking for couldn't be found.</h4>{" "}
        {/* Heading with an apology message */}
        <br /> {/* Adds a line break */}
        <p>
          Please go back to the <Link to={"/"}>home page</Link> and try again.{" "}
          {/* Paragraph with a link to the home page */}
        </p>
        <h6>
          If it still doesn't work for you, please reach out to our team at{" "}
          {/* Smaller heading with contact information */}
          <span style={{ color: "#f6912b" }}>support@abyssiniacoders.com</span>{" "}
          {/* Contact email with styled color */}
        </h6>
      </div>
    </div>
  );
}

export default NotFound; // Exports the NotFound component for use in other parts of the application
