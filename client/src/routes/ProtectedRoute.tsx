// internal imports of ressources
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import __ from "lodash";

const ProtectedRoute = () => {
  const token: string | null = window.localStorage.getItem("TOKEN");

  let isAuthenticated: boolean = false;

  if (token) {
    // if token exists
    isAuthenticated = true;
  }
  if (typeof window === "undefined") {
    // if user is out of the application window, set authenticated to false
    isAuthenticated = false;
  }

  const isAuth: React.ReactElement | null =
    __.isBoolean(isAuthenticated) && isAuthenticated ? (
      <Outlet />
    ) : (
      Navigate({ to: "/" })
    );

  return isAuth;
};

export default ProtectedRoute;

// this page makes the majority routes of the project protected and gives access to
// only authenticated users to all routes of the project
