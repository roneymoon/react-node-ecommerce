import React from 'react'
import "./Hero.css"

import Hand from "../assets/hand_icon.png"
import Arrow from "../assets/arrow.png"
import HeroImage from "../assets/hero_image.png"

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className='hero-hand-icon'>
            <p>new</p>
            <img src={Hand} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className='hero-latest-btn'>
          <div>Latest Collection</div>
          <img src={Arrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={HeroImage} alt="" />
      </div>
    </div>
  )
}

export default Hero
