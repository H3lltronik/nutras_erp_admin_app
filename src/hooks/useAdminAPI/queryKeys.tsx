import { AuthAPI } from "../../api";

// type Endpoint = 'me' | 'comments'; // Add new endpoint names here
export type Endpoint = "me"; // Add new endpoint names here

export type EndpointResponse<T extends Endpoint> = T extends "me"
  ? MeResponse
  : //   T extends 'comments' ? Comment[] :
    never;

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
};
