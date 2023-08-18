import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAuth from "../useAuth";
import { Endpoint, EndpointResponse, endpoints } from "./queryKeys";

const useAdminQuery = <T extends Endpoint>(
  endpoint: T
): UseQueryResult<EndpointResponse<T>, unknown> => {
  // Adjust the generic types based on your API response and error type
  const { isAuthenticated, loading, error } = useAuth();

  if (!endpoints[endpoint]) {
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }

  const { queryKey, apiCall } = endpoints[endpoint];

  return useQuery([queryKey], apiCall, { enabled: !loading });
};

export default useAdminQuery;
