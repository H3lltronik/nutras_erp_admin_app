import { AuthAPI, MeasurementAPI, ProfileAPI, UserAPI } from "../../api";

// type Endpoint = 'me' | 'comments'; // Add new endpoint names here
export type Endpoint = "me" | "users" | "profiles" | "measurements" | "products"; // Add new endpoint names here

export type EndpointResponse<T extends Endpoint> = T extends "me" ? MeResponse
  : T extends "users" ? GetUserResponse
  : T extends "profiles" ? GetProfilesResponse
  : T extends "measurements" ? GetMeasurementsResponse
  : T extends "products" ? GetProfilesResponse
  : never;

interface EndpointDetails<T extends Endpoint> {
  queryKey: string;
  apiCall: () => Promise<EndpointResponse<T>>;
}

console.log("AuthAPI", AuthAPI);

export const endpoints: Record<Endpoint, EndpointDetails<any>> = {
  me: {
    queryKey: "me",
    apiCall: () => AuthAPI.me(),
  },
  users: {
    queryKey: "users",
    apiCall: () => UserAPI.getUsers(),
  },
  profiles: {
    queryKey: "profiles",
    apiCall: () => ProfileAPI.getProfiles(),
  },
  measurements: {
    queryKey: "measurements",
    apiCall: () => MeasurementAPI.getMeasurements(),
  },
  products: {
    queryKey: "products",
    apiCall: () => ProfileAPI.getProfiles(),
  },
};
