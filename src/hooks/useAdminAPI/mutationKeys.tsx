import { MeasurementAPI, ProductAPI, ProfileAPI, UserAPI } from "../../api";

export type Mutation = "createUser" | "createProfile" | "createMeasurement" | "createProduct"; // Add other mutation names here

export type MutationRequest<T extends Mutation> = 
  T extends "createUser" ? CreateUserRequest
  : T extends "createProfile" ? CreateProfileRequest
  : T extends "createMeasurement" ? CreateMeasurementRequest
  : T extends "createProduct" ? CreateProductRequest
  : never;

export type MutationResponse<T extends Mutation> = 
  T extends "createUser" ? UserCreatedResponse
  : T extends "createProfile" ? ProfileCreatedResponse
  : T extends "createMeasurement" ? MeasurementCreatedResponse
  : T extends "createProduct" ? CreateProductRequest
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
  createMeasurement: {
    apiCall: (data) => MeasurementAPI.createMeasurement(data),
  },
  createProduct: {
    apiCall: (data) => ProductAPI.createProduct(data),
  },
  // Add other mutations here
};
