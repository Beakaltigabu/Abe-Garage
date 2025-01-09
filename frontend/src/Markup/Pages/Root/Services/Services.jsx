import React, { useEffect, useState } from "react"; // Import React library
import styles from "./Services.module.css"; // Import CSS module for styling
import { Link } from "react-router-dom"; // Import the Link component for navigation
import {
  FaPowerOff,
  FaCog,
  FaCar,
  FaTachometerAlt,
  FaPaintBrush,
} from "react-icons/fa"; // Import various icons from react-icons library
import Loading from "../../../Components/Loading/Loading"; // Import the Loading component

const Services = () => {
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

  return (
    <div className={styles.topheader}>
      {" "}
      {/* Wrapper div with topheader class */}
      <div className={styles.services}>
        {" "}
        {/* Container for the services section */}
        <div className={styles.heroSection}>
          {" "}
          {/* Hero section with title and breadcrumb */}
          <h1>Our Services</h1> {/* Main heading for the services page */}
          <p>
            <Link to="/home">Home</Link> &gt; {/* Link to the Home page */}
            <Link to="/services">Services</Link>{" "}
            {/* Link to the Services page */}
          </p>
        </div>
      </div>
      <section className={styles.servicesSection}>
        {" "}
        {/* Section for listing services */}
        <div className={styles.autoContainer}>
          {" "}
          {/* Container for the service items */}
          <div className={styles.secTitle}>
            {" "}
            {/* Section title container */}
            <div className={styles.header}>
              {" "}
              {/* Header with title and line */}
              <h2> Services That we Offer </h2>{" "}
              {/* Subheading for the section */}
              <div className={styles.greenLine}></div>{" "}
              {/* Green line under the heading */}
            </div>
            <div className={styles.text}>
              {" "}
              {/* Text description for the section */}
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
          <div className={styles.row}>
            {" "}
            {/* Container for individual service blocks */}
            <div className={styles.serviceBlockOne}>
              {" "}
              {/* First service block */}
              <div className={styles.innerBox}>
                {" "}
                {/* Inner container for service details */}
                <h5>Service and Repairs</h5> {/* Subtitle for the service */}
                <h2>Performance Upgrade</h2> {/* Main title for the service */}
                <a href="#" className={styles.readMore}>
                  {" "}
                  {/* Link to read more */}
                  Read More +
                </a>
                <div className={styles.icon}>
                  {" "}
                  {/* Container for service icon */}
                  <FaPowerOff /> {/* Icon for performance upgrade */}
                </div>
              </div>
            </div>
            <div className={styles.serviceBlockOne}>
              {" "}
              {/* Second service block */}
              <div className={styles.innerBox}>
                {" "}
                {/* Inner container for service details */}
                <h5>Service and Repairs</h5> {/* Subtitle for the service */}
                <h2>Transmission Services</h2>{" "}
                {/* Main title for the service */}
                <a href="#" className={styles.readMore}>
                  {" "}
                  {/* Link to read more */}
                  Read More +
                </a>
                <div className={styles.icon}>
                  {" "}
                  {/* Container for service icon */}
                  <FaCog /> {/* Icon for transmission services */}
                </div>
              </div>
            </div>
            <div className={styles.serviceBlockOne}>
              {" "}
              {/* Third service block */}
              <div className={styles.innerBox}>
                {" "}
                {/* Inner container for service details */}
                <h5>Service and Repairs</h5> {/* Subtitle for the service */}
                <h2>Break Repair & Service</h2>{" "}
                {/* Main title for the service */}
                <a href="#" className={styles.readMore}>
                  {" "}
                  {/* Link to read more */}
                  Read More +
                </a>
                <div className={styles.icon}>
                  {" "}
                  {/* Container for service icon */}
                  <FaTachometerAlt /> {/* Icon for break repair & service */}
                </div>
              </div>
            </div>
            <div className={styles.serviceBlockOne}>
              {" "}
              {/* Fourth service block */}
              <div className={styles.innerBox}>
                {" "}
                {/* Inner container for service details */}
                <h5>Service and Repairs</h5> {/* Subtitle for the service */}
                <h2>Engine Service & Repair</h2>{" "}
                {/* Main title for the service */}
                <a href="#" className={styles.readMore}>
                  {" "}
                  {/* Link to read more */}
                  Read More +
                </a>
                <div className={styles.icon}>
                  {" "}
                  {/* Container for service icon */}
                  <FaCar /> {/* Icon for engine service & repair */}
                </div>
              </div>
            </div>
            <div className={styles.serviceBlockOne}>
              {" "}
              {/* Fifth service block */}
              <div className={styles.innerBox}>
                {" "}
                {/* Inner container for service details */}
                <h5>Service and Repairs</h5> {/* Subtitle for the service */}
                <h2>Tyre & Wheels</h2> {/* Main title for the service */}
                <a href="#" className={styles.readMore}>
                  {" "}
                  {/* Link to read more */}
                  Read More +
                </a>
                <div className={styles.icon}>
                  {" "}
                  {/* Container for service icon */}
                  <FaTachometerAlt /> {/* Icon for tyre & wheels */}
                </div>
              </div>
            </div>
            <div className={styles.serviceBlockOne}>
              {" "}
              {/* Sixth service block */}
              <div className={styles.innerBox}>
                {" "}
                {/* Inner container for service details */}
                <h5>Service and Repairs</h5> {/* Subtitle for the service */}
                <h2>Denting & Painting</h2> {/* Main title for the service */}
                <a href="#" className={styles.readMore}>
                  {" "}
                  {/* Link to read more */}
                  Read More +
                </a>
                <div className={styles.icon}>
                  {" "}
                  {/* Container for service icon */}
                  <FaPaintBrush /> {/* Icon for denting & painting */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.callToAction}>
        {" "}
        {/* Call-to-action section */}
        <div className={styles.contactusText}>
          {" "}
          {/* Container for text in the call-to-action section */}
          <h2>Schedule Your Appointment Today</h2>{" "}
          {/* Main heading for the call-to-action */}
          <p>Your Automotive Repair & Maintenance Service Specialist</p>{" "}
          {/* Subtext for the call-to-action */}
        </div>
        <div className={styles.contactusButton}>
          {" "}
          {/* Container for the contact button */}
          <h2>1800.456.7890</h2>{" "}
          {/* Phone number displayed as part of the call-to-action */}
          <Link to="/contactus" className={styles.contactButton}>
            Contact Us
          </Link>{" "}
          {/* Link to contact us page with button styling */}
        </div>
      </div>
    </div>
  );
};

export default Services; // Export the Services component
