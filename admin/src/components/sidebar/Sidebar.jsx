import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaListAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar glass-effect">
      <NavLink
        to="/addproduct"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
      >
        <FaPlusCircle className="sidebar-icon" />
        <span>Add Product</span>
      </NavLink>
      <NavLink
        to="/listproduct"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
      >
        <FaListAlt className="sidebar-icon" />
        <span>Product List</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
