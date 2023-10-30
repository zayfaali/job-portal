import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Admin,
  Profile,
  Stats,
  EditJob,
  RegisterEmployer,
  LoginEmployer,
  JobApplications,
  UserApplications,
  EditJobApplication,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { loader as StatsLoader } from "./pages/Stats";
import { action as profileAction } from "./pages/Profile";
import { action as registerEmployerAction } from "./pages/RegisterEmployer";
import { action as LoginEmployerAction } from "./pages/LoginEmployer";
import { action as SubmitApplicationAction } from "./pages/SubmitApplication";
import { loader as applicaionsLoader } from "./pages/JobApplications";
import { loader as userApplicaionsLoader } from "./pages/UserApplications";
import { loader as editApplicationLoader } from "./pages/EditJobApplication";
import { action as editApplicationAction } from "./pages/EditJobApplication";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register-employer",
        element: <RegisterEmployer />,
        action: registerEmployerAction,
      },
      {
        path: "login-employer",
        element: <LoginEmployer />,
        action: LoginEmployerAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: "stats", element: <Stats />, loader: StatsLoader },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "delete-job/:id", action: deleteJobAction },
          {
            path: "submit-application/:jobId",
            action: SubmitApplicationAction,
          },
          {
            path: "job-applications",
            element: <JobApplications />,
            loader: applicaionsLoader,
          },
          {
            path: "user-applications",
            element: <UserApplications />,
            loader: userApplicaionsLoader,
          },
          {
            path: "edit-application/:id",
            element: <EditJobApplication />,
            loader: editApplicationLoader,
            action: editApplicationAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
