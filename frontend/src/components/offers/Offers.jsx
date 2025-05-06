import React from 'react'
import "./Offers.css"

import ExclusiveOffers from "../assets/exclusive_image.png"

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers only for you</h1>
            <p>ONLY ON BEST SELLING PRODUCTS</p>
            <button>check now</button>
        </div>
        <div className="offers-right">
            <img src={ExclusiveOffers} alt="" />
        </div>

    </div>
  )
}

export default Offers
