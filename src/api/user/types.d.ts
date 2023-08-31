interface User {
    id: string;
    username: string;
    password: string;
    profileId: string;
    profile: Profile;
}

type MeResponse = User

type GetUsersResponse = {
    data: User[]
    pagination: Pagination
}

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
type DeleteUserResponse = User

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