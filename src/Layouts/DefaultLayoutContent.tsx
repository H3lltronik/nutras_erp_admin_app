import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type DefaultLayoutContentProps = {
  children: React.ReactNode;
};

export const DefaultLayoutContent: React.FC<DefaultLayoutContentProps> = (
  props
) => {
  const { isAuthenticated, loading, error } = useAuth();
  const wasAuthenticated = useRef(isAuthenticated);

  useEffect(() => {
    if (!error) return;

    if (error.isAxiosError) {
      console.log("error stat", error.response?.status);
      console.log("wasAuthenticated.current", wasAuthenticated.current);
      if (error.response?.status == 401 && wasAuthenticated.current) {
        alert("Unauthorized");
      }
    }
  }, [error, isAuthenticated]);

  useEffect(() => {
    if (wasAuthenticated.current !== isAuthenticated) {
      console.log("changed auth", isAuthenticated);
      wasAuthenticated.current = isAuthenticated;
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return props.children;
};
