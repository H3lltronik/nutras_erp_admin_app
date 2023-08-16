import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type ProtectedRouteProps = {
  element: JSX.Element;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { element } = props;
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log("isAuthenticated && loading", isAuthenticated, loading);
  }, [isAuthenticated, loading]);

  if (isAuthenticated && !loading) {
    return element;
  } else if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  } else {
    return <div>Loading...</div>;
  }
};
