// useAdminMutation.tsx
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  Mutation,
  MutationRequest,
  MutationResponse,
  mutations,
} from "./mutationKeys";

const useAdminMutation = <T extends Mutation>(
  mutation: T
): UseMutationResult<MutationResponse<T>, unknown, MutationRequest<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { isAuthenticated, loading, error } = useAuth();
  if (!mutations[mutation]) {
    throw new Error(`Unknown mutation: ${mutation}`);
  }

  const { apiCall } = mutations[mutation];

  return useMutation<MutationResponse<T>, unknown, MutationRequest<T>>(apiCall);
};

export default useAdminMutation;
