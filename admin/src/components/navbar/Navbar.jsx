import React from 'react'
import "./Navbar.css";
import NavLogo from "../../assets/nav-logo.svg"
import NavProfile from "../../assets/exclusive_image.png"

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={NavLogo} alt="" className="nav-logo" />
      <img src={NavProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar