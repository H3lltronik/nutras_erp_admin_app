/**
 * ENTITIES
 */

interface User {
  id: string;
  username: string;
  password: string;
  profileId: string;
}

interface Profile {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  id: string;
  name: string;
  roles?: (string)[] | null;
}
interface Product {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  id: string;
  code: string;
  type: string;
  description: string;
}
interface Measurement {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  id: string;
  name: string;
}

/**
 * API RESPONSES
 */

type MeResponse = User

type GetUsersResponse = MeResponse[]
type GetUserResponse = MeResponse
type UpdatedUserResponse = {
  profile: Profile;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  username: string;
  password: string;
  profileId: string;
}

type GetProfileResponse = Profile
type GetProfilesResponse = Profile[]
type GetProductResponse = Product
type GetProductsResponse = Product[]
type GetMeasurementResponse = Measurement
type GetMeasurementsResponse = Measurement[]

type APIError = {
    statusCode: number
    message: string
}

interface UserCreatedResponse {
  username: string;
  password: string;
  profile: Profile;
  profileId: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface CreateUserRequest {
  username: string;
  password: string;
  profile: string;
}

type ProfileCreatedResponse = Profile
type ProductCreatedResponse = Product
type MeasurementCreatedResponse = Measurement

interface CreateProfileRequest {
  name: string;
  roles: string;
}
interface CreateProductRequest {
  code: string;
  type: string;
  description: string;
}
interface CreateMeasurementRequest {
  name: string;
}