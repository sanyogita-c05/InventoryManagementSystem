import React from "react";
import ProfilePic from "../Assets/p2.jpg";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        The freshest ingredients delivered right to my door! I love how easy it is to cook healthy meals without the prep work. It’s a game-changer for busy days!
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
        Shradha Magar, Home Chef &  Food Enthusiast
          .I’ve been looking for a way to eat healthier, and this service has been perfect. 
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Shradha Magar</h2>
      </div>
    </div>
  );
};

export default Testimonial;