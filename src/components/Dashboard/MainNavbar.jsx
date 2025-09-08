import React from "react";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch } from "react-redux";

export const MainNavbar = ({ logo, navLinks, toggleSidebar, type, user }) => {



   return (
    <div
      style={{
        height: "60px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>
      {/* <img src={swapLogo} alt="Logo" style={{ height: "40px" }} /> */}
      <button
        style={{
          padding: "6px 14px",
          borderRadius: "6px",
          background: "#007bff",
          color: "#fff",
          border: "none",
        }}
      >
        Logout
      </button>
    </div>
  );
};


