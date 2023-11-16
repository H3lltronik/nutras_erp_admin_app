import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AuthAPI } from "../api";

type ErrorType = AxiosError | null;

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [user, setUser] = useState<User | null>(null);

  const checkToken = async () => {
    try {
      const meData = await AuthAPI.me();
      if (meData.id) {
        setIsAuthenticated(true);
        console.log("meData", meData);
        setUser(meData);
      }
      setLoading(false);
    } catch (error: unknown) {
      setError(error as ErrorType);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    loading,
    user,
    isAuthenticated,
    error,
  };
};

export default useAuth;
