import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MemberDashboardSidebar } from "./SideBar";
import swapLogo from "../../../assets/logos/Group 2.png";
// import { MainNavbar } from "../../Dashboard/MainNavbar"; // Uncomment if needed

export const MemberDashboardLayout = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user); // Example Redux usage

  // Detect screen size
  const getScreenSize = () => {
    if (window.innerWidth > 991.9) return "desktop";
    if (window.innerWidth > 575) return "tablet";
    return "mobile";
  };

  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [isSidebarOpen, setSidebarOpen] = useState(getScreenSize() !== "mobile");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const newSize = getScreenSize();
      setScreenSize(newSize);
      setSidebarOpen(newSize !== "mobile");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar width handling
  const sidebarWidth =
    screenSize === "desktop" ? 204 : screenSize === "tablet" && !isSidebarOpen ? 50 : 0;

  return (
    <section
      style={{
        display: "flex",
        flexDirection:"column",
        // minHeight: "100vh",
        // flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <MemberDashboardSidebar
        screenSize={screenSize}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          // marginLeft:"200px"
          marginLeft: `${sidebarWidth}px`,
          transition: "margin-left 0.3s ease",
          // paddingBottom: screenSize === "mobile" ? "70px" : "0",
        }}
      >
        <Outlet />
      </div>
    </section>
  );
};
