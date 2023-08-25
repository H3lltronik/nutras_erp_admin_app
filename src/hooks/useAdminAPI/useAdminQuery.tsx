import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { UseQueryOptions } from "react-query";
import useAuth from "../useAuth";
import {
  AdminQueryEndpointParams,
  Endpoint,
  EndpointResponse,
  endpoints,
} from "./queryKeys";

const useAdminQuery = <T extends Endpoint>(
  endpoint: T,
  params: AdminQueryEndpointParams = {},
  queryOptions?: UseQueryOptions<EndpointResponse<T>, unknown>
): UseQueryResult<EndpointResponse<T>, unknown> => {
  // Adjust the generic types based on your API response and error type
  const { loading } = useAuth();

  const _loading = useMemo(() => {
    return queryOptions?.enabled ? queryOptions?.enabled && loading : loading;
  }, [loading, queryOptions?.enabled]);

  if (!endpoints[endpoint]) {
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }

  const { queryKey, apiCall } = endpoints[endpoint];

  return useQuery([queryKey], () => apiCall(params), {
    enabled: !_loading,
    ...queryOptions,
  });
};

export default useAdminQuery;
