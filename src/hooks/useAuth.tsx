import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AuthAPI } from "../api";

type ErrorType = AxiosError | null;

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const checkToken = async () => {
    try {
      const meData = await AuthAPI.me();
      if (meData.id) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    } catch (error: unknown) {
      console.log("[useAuth] error", error);
      setError(error as ErrorType);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    loading,
    isAuthenticated,
    error,
  };
};

export default useAuth;
