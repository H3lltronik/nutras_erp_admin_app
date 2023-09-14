interface Profile {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  name: string;
  roles: string[];
}

interface GetProfilesResponse {
  data: Profile[];
  pagination: Pagination;
}

type GetProfileResponse = Profile;

type ProfileCreatedResponse = Profile;

type CreateProfileRequest = Omit<Profile, "id">;

type ProfileUpdatedResponse = Profile;

type DeleteProfileResponse = Profile;

// parsed

type ProfileWithStatus = Profile & { status: string };
type ProfilesWithStatus = ProfileWithStatus[];
type GetProfilesResponseWithStatus = {
  data: ProfilesWithStatus;
  pagination: Pagination;
};
