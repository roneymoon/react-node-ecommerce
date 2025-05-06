import React from 'react'
import "./BreadCrumbs.css"
import arrow_icon from "../assets/breadcrum_arrow.png";

const BreadCrumbs = (props) => {
    const {product} = props
  return (
    <div className='breadcrumb'>
        HOME <img src={arrow_icon} alt=""/> SHOP <img src={arrow_icon} alt=""/> {product.category} <img src={arrow_icon} alt=""/> {product.name}
    </div>
  )
}

export default BreadCrumbs
