import React from 'react'
import "./Footer.css"
import FooterLogo from "../assets/logo_big.png"
import InstagramLogo from "../assets/instagram_icon.png"
import PinterestLogo from "../assets/pintester_icon.png"
import WhatsappLogo from "../assets/whatsapp_icon.png"


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={FooterLogo} alt="footer" />
        <p>Peaky Drips</p>
      </div>
      <ul className='footer-links'>
        <li>company</li>
        <li>product</li>
        <li>offices</li>
        <li>about</li>
        <li>contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={InstagramLogo} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={PinterestLogo} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={WhatsappLogo} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2025 Peaky Drips. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
