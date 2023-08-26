interface User {
    id: string;
    username: string;
    password: string;
    profileId: string;
}

type MeResponse = User

type GetUsersResponse = User[]
type GetUserResponse = User
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
type DeleteUserResponse = {
    raw: unknown;
    affected: number;
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