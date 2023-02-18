import React from "react";
import "../styles/infocard.css";
const InfoCard = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div class="box">
        <div className="left"></div>
        <div class="right">
          <div class="content">
            <h1>Worried about your growth?</h1>
            <p>Lets prosper together. </p>
            <p>Quality is our top most priority.</p>
            <a href="#" className="btn rounded">
              Join Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
