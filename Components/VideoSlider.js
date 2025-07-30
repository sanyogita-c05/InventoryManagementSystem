import React, { useState } from "react";
import Video1 from "../Assets/1.mp4";
import Video2 from "../Assets/2.mp4";
import Video3 from "../Assets/3.mp4";
import Video4 from "../Assets/4.mp4";

const VideoSlider = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      videoSrc: Video1,
      heading: "Efficient Ingredient Tracking:",
      description: "Easily manage your kitchen inventory by tracking ingredient quantities in real-time. With instant updates and low-stock alerts, you can ensure you never run out of essential items during busy hours. Manage your inventory effortlessly with a few clicks and avoid unnecessary food waste.",
    },
    {
      videoSrc: Video2,
      heading: "Real-Time Stock Updates:",
      description: "Keep track of your stock levels with real-time updates. Whether it's vegetables, spices, or meat, our system monitors ingredient usage and provides accurate stock counts. You can always make informed decisions and ensure your kitchen is fully stocked without over-ordering.",
    },
    {
      videoSrc: Video3,
      heading: "Expiry Date Alerts:",
      description: "Never worry about expired ingredients again. Our system helps you track expiry dates and notifies you ahead of time. With automatic reminders, you'll never forget to use ingredients before they go bad, helping you maintain quality and reduce waste in your kitchen.",
    },
    {
      videoSrc: Video4,
      heading: "Automated Purchase Orders:",
      description: "Streamline your purchasing process by automatically generating purchase orders. The system analyzes your stock levels and usage patterns to create orders when necessary. This automation ensures you always have enough ingredients and reduces the chances of running out of stock unexpectedly.",
    },
  ];

  const handleClick = (index) => {
    setCurrentVideo(index);
  };

  return (
    <div className="video-slider-container">
      <video
        src={videos[currentVideo].videoSrc}
        autoPlay
        loop
        muted
        className="video-background"
      />
      <div className="video-description">
        <h2>{videos[currentVideo].heading}</h2>
        <p>{videos[currentVideo].description}</p>
      </div>
      <div className="video-navigation">
        {videos.map((_, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={index === currentVideo ? "active" : ""}
          >
            &#8226;
          </span>
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;
