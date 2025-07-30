 import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import Footer from './Footer';  // Ensure Footer is imported here
import { FiArrowRight } from "react-icons/fi";
import VideoSlider from "./VideoSlider";
import "../Components/Home.css"; // Ensure this path is correct for the styling
import G1 from "../Assets/g11.jpg";
import G2 from "../Assets/g22.jpg";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      
      {/* Top Banner */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Background" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Fresh & Healthy Ingredients, Delivered Hot & Fresh!
          </h1>
          <p className="primary-text">
          Never run out of the essentials again. Get notified when ingredients are running low so you can restock in time.
          </p>
          <button className="secondary-button">
            GET Now <FiArrowRight />
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div>

      {/* Middle Video Slider Section */}
      <VideoSlider />
{/* Team Members Section */}
<div className="team-section">
  <h2 className="team-heading">Meet Our Team</h2>
  <div className="team-members">
    <div className="team-member">
      <img src={G1} alt="Sanyogita Chavan" />
      <h3>Sanyogita Chavan</h3>
      <p className="role">Frontend Developer</p>
      <div className="social-icons">
  <FaFacebookF />
  <FaTwitter />
  <FaInstagram />
</div>

    </div>
    <div className="team-member">
      <img src={G2} alt="Sejal Barapatre" />
      <h3>Sejal Barapatre</h3>
      <p className="role">Backend Developer</p>
      <div className="social-icons">
  <FaFacebookF />
  <FaTwitter />
  <FaInstagram />
</div>

    </div>
  </div>
</div>



      {/* Footer Component */}
      <Footer /> {/* Footer is placed only once here */}
    </div>
  );
};

export default Home;