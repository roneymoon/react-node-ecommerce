import React, { useState } from 'react';
import "./DescriptionBox.css";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div 
          className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`} 
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        <div 
          className={`descriptionbox-nav-box ${activeTab === "reviews" ? "active" : "fade"}`} 
          onClick={() => setActiveTab("reviews")}
        >
          Reviews (122)
        </div>
      </div>
      <div className="descriptionbox-content">
        {activeTab === "description" ? (
          <div className="descriptionbox-description">
            <p>
              Engineered for style and performance, our premium men’s/women’s jacket is crafted from high-density water-resistant fabric for all-weather protection. Featuring a breathable mesh lining for enhanced comfort, adjustable cuffs and hem for a snug fit, and a YKK zipper closure for durability. The lightweight insulation ensures optimal warmth without bulk, while the ergonomic stitch design enhances mobility. Perfect for urban explorers and outdoor adventurers alike!
            </p>
            <p>
              This jacket features true-to-size dimensions with a structured yet flexible cut for ease of movement. Made from a premium polyester-cotton blend, it offers a soft-touch texture, breathable inner lining, and windproof outer shell, ensuring all-day comfort and durability.
            </p>
          </div>
        ) : (
          <div className="descriptionbox-reviews">
            <p>Customer reviews will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
