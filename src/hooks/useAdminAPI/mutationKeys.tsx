import { UserAPI } from "../../api";

export type Mutation = "createUser"; // Add other mutation names here

export type MutationRequest<T extends Mutation> = T extends "createUser"
  ? CreateUserRequest
  : never;

export type MutationResponse<T extends Mutation> = T extends "createUser"
  ? UserCreatedResponse
  : never;

interface MutationDetails<T extends Mutation> {
  apiCall: (data: MutationRequest<T>) => Promise<MutationResponse<T>>;
}

export const mutations: { [K in Mutation]: MutationDetails<K> } = {
  createUser: {
    apiCall: (data) => UserAPI.createUser(data),
  },
  // Add other mutations here
};
