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
import ProtectedRoute from "./ProtectedRoute";

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
    element: (
      <ProtectedRoute adminOnly>
        <AdminPanelPage />
      </ProtectedRoute>
    ),
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

      {
        path: "games/seven-updown",
        element: <SevenUpDownPage />,

      },


      {
        path: "games/roulette",
        element: <RoulettePage />,
      },
      {
        path: "games/teen-patti",
        element: <BPExchRSCPage initialId={900003} />,
      },
      {
        path: "games/dragon-tiger",
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
