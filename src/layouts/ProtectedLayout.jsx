import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getLearnerName } from "../storage/learnerStorage";

const ProtectedLayout = () => {
  const learnerName = getLearnerName();

  if (!learnerName) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
