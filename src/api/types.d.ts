type MeResponse = {
    id: string;
    username: string;
    password: string;
    profileId: string;
}

type GetUserResponse = MeResponse[]

type Profile = {
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    id: string
    name: string
    roles: string[]
}

type GetProfileResponse = Profile
type GetProfilesResponse = Profile[]