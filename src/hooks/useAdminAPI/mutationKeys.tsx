import { ProfileAPI, UserAPI } from "../../api";

export type Mutation = "createUser" | "createProfile"; // Add other mutation names here

export type MutationRequest<T extends Mutation> = 
  T extends "createUser" ? CreateUserRequest
  : T extends "createProfile" ? CreateProfileRequest
  : never;

export type MutationResponse<T extends Mutation> = 
  T extends "createUser" ? UserCreatedResponse
  : T extends "createProfile" ? ProfileCreatedResponse
  : never;

interface MutationDetails<T extends Mutation> {
  apiCall: (data: MutationRequest<T>) => Promise<MutationResponse<T>>;
}

export const mutations: { [K in Mutation]: MutationDetails<K> } = {
  createUser: {
    apiCall: (data) => UserAPI.createUser(data),
  },
  createProfile: {
    apiCall: (data) => ProfileAPI.createProfile(data),
  },
  // Add other mutations here
};
