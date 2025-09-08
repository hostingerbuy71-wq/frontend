import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MemberDashboardLayout } from "../components/Layout/Dashboard/Layout";
import { BPExchLayout } from "../components/Layout/BPExchLayout/BPExchLayout";
import { DashBoardContentPage } from "@/pages/DashBoardContentPage";
import { BPExchDashboardPage } from "../pages/BPExchDashboardPage";
import { BPExchRSCPage } from "../pages/BPExchRSCPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import RoyalStarCasinoComponent from "@/components/Frontend/RoyalStarCasinoComponent";
import SevenUpDownPage from "@/pages/SevenUpDownPage";
import RoulettePage from "@/pages/RoulettePage";
import DragonTigerPage from "@/pages/DragonTigerPage";
import { UserPannelPage } from "@/pages/UserPannelPage";
import AdminPanelPage from "@/pages/AdminPanelPage";

// Your components

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/user-dashboard",
    element: <UserPannelPage />,
  },
  {
    path: "admin",
    element: <AdminPanelPage />,
  },
  {
    path: "/",
    element: <MemberDashboardLayout />,
    children: [
      {
        index: true,
        element: <DashBoardContentPage />,
      },

      {
        path: "common/dashboard",
        element: <DashBoardContentPage />,
      },
      // Sports routes
      {
        path: "soccer",
        element: <DashBoardContentPage />,
      },
      {
        path: "tennis",
        element: <DashBoardContentPage />,
      },
      {
        path: "cricket",
        element: <DashBoardContentPage />,
      },
      {
        path: "horse-race",
        element: <DashBoardContentPage />,
      },
      {
        path: "gray-hound",
        element: <DashBoardContentPage />,
      },
      // Casino and other routes
      {
        path: "sport-book",
        element: <DashBoardContentPage />,
      },
      {
        path: "royal-star-casino",
        element: <RoyalStarCasinoComponent />,
      },
      {
        path: "star-casino",
        element: <DashBoardContentPage />,
      },
      {
        path: "world-casino",
        element: <DashBoardContentPage />,
      },
      {
        path: "royal-casino",
        element: <DashBoardContentPage />,
      },
      {
        path: "betfair-game",
        element: <DashBoardContentPage />,
      },
      {
        path: "teen-patti-studio",
        element: <DashBoardContentPage />,
      },
      {
        path: "galaxy-casino",
        element: <DashBoardContentPage />,
      },
      {
        path: "current-position",
        element: <DashBoardContentPage />,
      },
      {
        path: "/games/7updown",
        element: <SevenUpDownPage />,
      },
      
      {
        path: "/games/roulette",
        element: <RoulettePage />,
      },
      {
        path: "/games/teen-patti",
        element: <BPExchRSCPage initialId={900003} />,
      },
      {
        path: "/games/dragon-tiger",
        element: <DragonTigerPage />,
      },
    ],
  },
  // New direct aliases for RSC page (both cases)
  {
    path: "/Common/RSC",
    element: <BPExchLayout />,
    children: [{ index: true, element: <BPExchRSCPage /> }],
  },
  {
    path: "/common/rsc",
    element: <BPExchLayout />,
    children: [{ index: true, element: <BPExchRSCPage /> }],
  },
  {
    path: "/common/sap",
    element: <BPExchLayout />,
    children: [
      {
        index: true,
        element: <BPExchDashboardPage />,
      },
      {
        path: "rsc",
        element: <BPExchRSCPage />,
      },
    ],
  },
]);

export const WebRouter = () => {
  return <RouterProvider router={router} />;
};
