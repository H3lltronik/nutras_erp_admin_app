import {
  AuthAPI,
  MeasurementAPI,
  ProductAPI,
  ProfileAPI,
  UserAPI,
} from "../../api";

// type Endpoint = 'me' | 'comments'; // Add new endpoint names here
export type Endpoint =
  | "me"
  | "users"
  | "profiles"
  | "measurements"
  | "products"; // Add new endpoint names here

export type EndpointResponse<T extends Endpoint, U = undefined> = T extends "me"
  ? MeResponse
  : T extends "users" ? U extends string ? GetUserResponse : GetUsersResponse
  : T extends "profiles"
  ? GetProfilesResponse
  : T extends "measurements"
  ? GetMeasurementsResponse
  : T extends "products"
  ? GetProductsResponse
  : never;

type UsersQueryParams = {
  id?: string;
};

export type AdminQueryEndpointParams = UsersQueryParams

interface EndpointDetails<T extends Endpoint, P = UsersQueryParams> {
  queryKey: string;
  apiCall: (params?: P) => Promise<EndpointResponse<T>>;
}

export const endpoints: Record<Endpoint, EndpointDetails<Endpoint>> = {
  me: {
    queryKey: "me",
    apiCall: () => AuthAPI.me(),
  },
  users: {
    queryKey: "users",
    apiCall: (params?) =>
      params?.id ? UserAPI.getUser(params.id) : UserAPI.getUsers(),
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
    apiCall: () => ProductAPI.getProducts(),
  },
};
