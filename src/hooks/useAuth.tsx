import { useEffect, useState } from "react";
import { AuthAPI } from "../api";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const meData = await AuthAPI.me();
      console.log("meData", meData);
      if (meData.id) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    loading,
    isAuthenticated,
  };
};

export default useAuth;
