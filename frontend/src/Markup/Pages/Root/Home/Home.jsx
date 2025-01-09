import React, { useState, useEffect } from "react"; // Import React and hooks
import Loading from "../../../Components/Loading/Loading"; // Import Loading component
import { Link } from "react-router-dom"; // Import Link component for navigation
import { FaPlay } from "react-icons/fa"; // Import FaPlay icon
import { FaWrench, FaMedal, FaTags, FaUserCog } from "react-icons/fa"; // Import additional icons
import workshopRight3 from "../../../../assets/images/workshopRight3.png"; // Import image assets
import styles from "./Home.module.css"; // Import CSS module for styling
import workshopLeft from "../../../../assets/images/workshopLeft.png"; // Import image assets
import whyus from "../../../../assets/images/whyus.png"; // Import image assets
import workshopRight2 from "../../../../assets/images/workshopRight2.png"; // Import image assets
import {
  FaPowerOff,
  FaCog,
  FaCar,
  FaTachometerAlt,
  FaPaintBrush,
} from "react-icons/fa"; // Import more icons
import BottomSections from "../BottomSections/BottomSections";

function Home() {
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
    <div className={styles.topcontainer}>
      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.autoContainer}>
          <div className={styles.row1}>
            {/* Left Column: Images */}
            <div className={styles.colLeft}>
              <div className={styles.imageBox}>
                <img
                  className={styles.image1}
                  src={workshopLeft}
                  alt="Image 1" // Alt text for accessibility
                />
                <img src={workshopRight3} alt="Image 2" />{" "}
                {/* Alt text for accessibility */}
              </div>
              <div className={styles.yearExperience}>
                <strong>24</strong> <br /> years <br /> Experience
              </div>
            </div>

            {/* Right Column: Text */}
            <div className={styles.colRight}>
              <div className={styles.secTitle3}>
                <h4>Welcome to Our Workshop</h4>
                <h2>We have 24 years experience</h2>
                <div className={styles.text}>
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution.
                  </p>
                  <p>
                    Capitalize on low-hanging fruit to identify a ballpark
                    value-added activity to beta test. Override the digital
                    divide with additional clickthroughs from DevOps.
                    Nanotechnology immersion along the information highway will
                    close the loop on focusing.
                  </p>
                </div>
                <div className={styles.linkBtn}>
                  <a href="/aboutus" className={styles.themeBtn}>
                    <span>
                      About Us <i className="flaticon-right"></i>{" "}
                      {/* Right arrow icon */}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.autoContainer}>
          <div className={styles.secTitle}>
            <div className={styles.header}>
              <h2>Services That We Offer</h2>
              <div className={styles.greenLine}></div>{" "}
              {/* darkorange underline */}
            </div>
            <div className={styles.text}>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
          <div className={styles.row}>
            {/* Service Block 1 */}
            <div className={styles.serviceBlockOne}>
              <div className={styles.innerBox}>
                <h5>Service and Repairs</h5>
                <h2>Performance Upgrade</h2>
                <a href="#" className={styles.readMore}>
                  Read More +
                </a>
                <div className={styles.icon}>
                  <FaPowerOff /> {/* Power off icon */}
                </div>
              </div>
            </div>
            {/* Service Block 2 */}
            <div className={styles.serviceBlockOne}>
              <div className={styles.innerBox}>
                <h5>Service and Repairs</h5>
                <h2>Transmission Services</h2>
                <a href="#" className={styles.readMore}>
                  Read More +
                </a>
                <div className={styles.icon}>
                  <FaCog /> {/* Cog icon */}
                </div>
              </div>
            </div>
            {/* Service Block 3 */}
            <div className={styles.serviceBlockOne}>
              <div className={styles.innerBox}>
                <h5>Service and Repairs</h5>
                <h2>Brake Repair & Service</h2>
                <a href="#" className={styles.readMore}>
                  Read More +
                </a>
                <div className={styles.icon}>
                  <FaTachometerAlt /> {/* Tachometer icon */}
                </div>
              </div>
            </div>
            {/* Service Block 4 */}
            <div className={styles.serviceBlockOne}>
              <div className={styles.innerBox}>
                <h5>Service and Repairs</h5>
                <h2>Engine Service & Repair</h2>
                <a href="#" className={styles.readMore}>
                  Read More +
                </a>
                <div className={styles.icon}>
                  <FaCar /> {/* Car icon */}
                </div>
              </div>
            </div>
            {/* Service Block 5 */}
            <div className={styles.serviceBlockOne}>
              <div className={styles.innerBox}>
                <h5>Service and Repairs</h5>
                <h2>Tire & Wheels</h2>
                <a href="#" className={styles.readMore}>
                  Read More +
                </a>
                <div className={styles.icon}>
                  <FaTachometerAlt /> {/* Tachometer icon */}
                </div>
              </div>
            </div>
            {/* Service Block 6 */}
            <div className={styles.serviceBlockOne}>
              <div className={styles.innerBox}>
                <h5>Service and Repairs</h5>
                <h2>Denting & Painting</h2>
                <a href="#" className={styles.readMore}>
                  Read More +
                </a>
                <div className={styles.icon}>
                  <FaPaintBrush /> {/* Paint brush icon */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.autoContainer2}>
          <div className={styles.innerContainer2}>
            <h2>Quality Service And Customer Satisfaction !!</h2>
            <p className={styles.text}>
              We utilize the most recent symptomatic gear to ensure your vehicle
              is fixed or adjusted appropriately and in an opportune manner. We
              are an individual from Professional Auto Service, a first class
              execution arrange, where free assistance offices share shared
              objectives of being world-class car administration focuses.
            </p>
          </div>

          <div className={styles.tireimage}>
            <img
              style={{ maxHeight: "400px" }} // Inline style to control image height
              src={workshopRight2}
              alt="Quality Service" // Alt text for accessibility
            />
          </div>
        </div>
      </section>

      <BottomSections />
    </div>
  );
}

export default Home;
