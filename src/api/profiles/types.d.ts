interface Profile {
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    id: string;
    name: string;
    roles?: (string)[] | null;
}

interface GetProfilesResponse {
    data: Profile[]
    pagination: Pagination
}

type GetProfileResponse = Profile

type ProfileCreatedResponse = Profile

interface CreateProfileRequest {
    name: string;
    roles: string;
}

type ProfileUpdatedResponse = Profile

type DeleteProfileResponse = Profile
