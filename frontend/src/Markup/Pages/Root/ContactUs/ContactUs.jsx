import React, { useEffect, useState } from "react"; // Import React library for using React components
import styles from "./ContactUs.module.css"; // Import CSS module for styling the component
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import BottomSections from "../BottomSections/BottomSections";
import Loading from "../../../Components/Loading/Loading"; // Import the Loading component

const ContactUs = () => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />; // Display loading screen while data is being fetched
  }

  // Define the ContactUs functional component
  return (
    <div className={styles.contactUs}>
      {" "}
      {/* Main container for the Contact Us page */}
      <div className={styles.heroSection}>
        {" "}
        {/* Hero section with title and breadcrumb navigation */}
        <h1>Contact Us</h1> {/* Main heading for the page */}
        <p>
          <Link to="/home">Home</Link> &gt; {/* Breadcrumb link to Home page */}
          <Link to="/aboutus">About Us</Link>{" "}
          {/* Breadcrumb link to About Us page */}
        </p>
      </div>
      <div className={styles.contactSection}>
        {" "}
        {/* Section containing map and address details */}
        <div className={styles.mapContainer}>
          {" "}
          {/* Container for Google Map iframe */}
          <iframe
            title="Google Map" // Accessibility title for the iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0834136036097!2d-77.04274858425852!3d38.898722979570115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b9c1b44a8d4f%3A0x2e20d1f90ab5cc8c!2sWhite%20House!5e0!3m2!1sen!2sus!4v1620244590951!5m2!1sen!2sus"
            width="100%" // Make the iframe take up the full width of its container
            height="400px" // Set the height of the iframe
            style={{ border: 0 }} // Remove border from the iframe
            allowFullScreen="" // Allow the iframe to be displayed in full screen mode
            loading="lazy" // Delay loading of the iframe until it is needed
          ></iframe>
        </div>
        <div className={styles.addressContainer}>
          {" "}
          {/* Container for address and contact details */}
          <h2>Our Address</h2> {/* Subheading for the address section */}
          <p>
            Completely synergize resource taxing relationships via premier niche
            markets. Professionally cultivate one-to-one customer service.
          </p>
          <div className={styles.contactDetails}>
            {" "}
            {/* Container for individual contact details */}
            <div className={styles.contactDetail}>
              {" "}
              {/* Container for an individual contact detail */}
              <i className="fas fa-map-marker-alt"></i>{" "}
              {/* FontAwesome map marker icon */}
              <span>Address:</span> {/* Label for the address detail */}
              <p>548B, Tailstoi Town 5238 MT, La city, IA 5224</p>{" "}
              {/* Address detail */}
            </div>
            <div className={styles.contactDetail}>
              {" "}
              {/* Container for email contact detail */}
              <i className="fas fa-envelope"></i>{" "}
              {/* FontAwesome envelope icon */}
              <span>Email:</span> {/* Label for the email detail */}
              <p>contact@buildtruck.com</p> {/* Email address detail */}
            </div>
            <div className={styles.contactDetail}>
              {" "}
              {/* Container for phone contact detail */}
              <i className="fas fa-phone"></i> {/* FontAwesome phone icon */}
              <span>Phone:</span> {/* Label for the phone detail */}
              <p>1800 456 7890 / 1254 897 3654</p> {/* Phone number details */}
            </div>
          </div>
        </div>
      </div>
      <BottomSections />
    </div>
  );
};

export default ContactUs; // Export the ContactUs component for use in other parts of the application
