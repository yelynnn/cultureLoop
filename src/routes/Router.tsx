import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RootLayout from "./RootLayout";
import ChallengePage from "../pages/ChallengePage";
import ProfilePage from "../pages/ProfilePage";
import MissionDetailPage from "@/pages/MissionDetailPage";
import CreateMissionPage from "@/pages/CreateMissionPage";
import PreferencePage from "@/pages/PreferencePage";
import MissionCountPage from "@/pages/MissionCountPage";
import MyCouponPage from "@/pages/MyCouponPage";
import MyMissionStatusPage from "@/pages/MyMissionStatusPage";
import CreateTravelLogPage from "@/pages/CreateTravelLogPage";
import NewTravelLogPage from "@/pages/NewTravelLogPage";
import MyBadgePage from "@/pages/MyBadgePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "challenges",
        element: <ChallengePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "challenge/:challengeId/detail",
        element: <MissionDetailPage />,
      },
      {
        path: "create-mission",
        element: <CreateMissionPage />,
      },
      {
        path: "signup-prefer",
        element: <PreferencePage />,
      },
      {
        path: "signup-count",
        element: <MissionCountPage />,
      },
      {
        path: "my-coupon",
        element: <MyCouponPage />,
      },
      {
        path: "my-badge",
        element: <MyBadgePage />,
      },
      {
        path: "missions/ongoing",
        element: <MyMissionStatusPage />,
      },
      {
        path: "missions/achieved",
        element: <MyMissionStatusPage />,
      },
      {
        path: "my-journals",
        element: <MyMissionStatusPage />,
      },
      {
        path: "challenge/:challengeId/create-journal",
        element: <CreateTravelLogPage />,
      },
      {
        path: "journal/:logId/detail",
        element: <NewTravelLogPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
