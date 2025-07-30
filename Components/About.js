import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Food Is an Essential Part of a Healthy, Balanced Lifestyle
        </h1>
        <p className="primary-text">
        We prioritize quality and freshness in every dish we prepare, ensuring that you can focus on creating wholesome meals without the hassle. Let us handle the prep work while you enjoy the simplicity and joy of cooking.
        </p>
        <p className="primary-text">
        Our commitment is to provide you with the freshest ingredients, expertly prepared and ready for your next meal. We bring you the convenience of ready-to-cook freshness, so you can savor nutritious meals without the time-consuming steps.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;