/**
 * ENTITIES
 */

interface Profile {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  id: string;
  name: string;
  roles?: (string)[] | null;
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

type MeResponse = {
    id: string;
    username: string;
    password: string;
    profileId: string;
}

type GetUserResponse = MeResponse[]

type GetProfileResponse = Profile
type GetProfilesResponse = Profile[]
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
type MeasurementCreatedResponse = Measurement

interface CreateProfileRequest {
  name: string;
  roles: string;
}

interface CreateMeasurementRequest {
  name: string;
}