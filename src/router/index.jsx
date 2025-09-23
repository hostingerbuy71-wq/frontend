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
import AdminDashboardLayout from "@/components/Layout/admin/Layout";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminReportsPage from "@/pages/AdminReportsPage";
import AdminSoccerMatchPage from "@/pages/AdminSoccerMatchPage";
import AdminCurrentPositionPage from "@/pages/AdminCurrentPositionPage";
import AdminBetLockPage from "@/pages/AdminBetLockPage";
import AdminStarCasinoPage from "@/pages/AdminStarCasinoPage";
import AdminWorldCasinoPage from "@/pages/AdminWorldCasinoPage";
import AdminBetFairGamesPage from "@/pages/AdminBetFairGamesPage";
import AdminNewUserPage from "@/pages/AdminNewUserPage";

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
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminPanelPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "users/new", element: <AdminNewUserPage /> },
      { path: "reports", element: <AdminReportsPage /> },
      { path: "positions", element: <AdminCurrentPositionPage /> },
      { path: "bet-lock", element: <AdminBetLockPage /> },
      { path: "games/soccer", element: <div style={{padding:16}}>Soccer markets</div> },
      { path: "soccer/:slug", element: <AdminSoccerMatchPage /> },
      { path: "games/tennis", element: <div style={{padding:16}}>Tennis markets</div> },
      { path: "games/star-casino", element: <AdminStarCasinoPage /> },
      { path: "world-casino", element: <AdminWorldCasinoPage /> },
      { path: "betfair-games", element: <AdminBetFairGamesPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MemberDashboardLayout />
      </ProtectedRoute>
    ),
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
      // Show Royal Star Casino catalog page under the dashboard layout
      {
        path: "royal-star-casino",
        element: <RoyalStarCasinoComponent />,
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
