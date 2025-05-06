import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo from "../assets/logo.png";
import cart from "../assets/cart_icon.png";
import { ShopContext } from "../../contexts/ShopContext";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // for hamburger

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [openMenu, setOpenMenu] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <Link to="/"><p>Peaky Drips</p></Link>
      </div>

      <div className={`nav-menu ${openMenu ? "open" : ""}`}>
        <li onClick={() => setMenu("shop")}><Link to="/">Shop {menu === "shop" && <hr />}</Link></li>
        <li onClick={() => setMenu("men")}><Link to="/mens">Men {menu === "men" && <hr />}</Link></li>
        <li onClick={() => setMenu("women")}><Link to="/womens">Women {menu === "women" && <hr />}</Link></li>
        <li onClick={() => setMenu("kids")}><Link to="/kids">Kids {menu === "kids" && <hr />}</Link></li>
      </div>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? <button onClick={()=>{localStorage.removeItem("auth-token");window.location.replace("/login")}}>Logout</button> : <Link to="/login"><button>Login</button></Link>}
        <Link to="/cart"><img src={cart} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {openMenu ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
      </div>
    </div>
  );
};

export default Navbar;
