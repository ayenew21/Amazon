import React, { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);

  // Prevent rendering the children if redirecting
  if (!user) return null;

  return children;
};

export default ProtectedRoute;
