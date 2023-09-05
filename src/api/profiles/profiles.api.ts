import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseProfilesAPI extends BaseAPI {
  async createProfile<CreateProfileRequest>(
    data: CreateProfileRequest
  ): Promise<ProfileCreatedResponse> {
    return this.post<ProfileCreatedResponse, CreateProfileRequest>("", data);
  }

  async getProfiles(params?: QueryParams): Promise<GetProfilesResponseWithStatus | APIError> {
    try {
      // return this.get<GetProfilesResponse>("", params);
      const profiles = await this.get<GetProfilesResponse>("", params);
      const profilesWithStatus = profiles.data.map((profile) =>
        Object.assign({}, profile, {
          status: statusParser(profile),
        })
      );

      return {
        data: profilesWithStatus,
        pagination: profiles.pagination,
      };
      
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getProfile(
    userId: string,
    params?: QueryParams
  ): Promise<GetProfileResponse> {
    return this.get<GetProfileResponse>(`/${userId}`, params);
  }

  async updateProfile<U>(
    userId: string,
    data: U,
    params?: QueryParams
  ): Promise<ProfileUpdatedResponse> {
    return this.patch<ProfileUpdatedResponse, U>(`/${userId}`, data, params);
  }

  async deleteProfile(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteProfileResponse | APIError> {
    return this.delete<DeleteProfileResponse>(`/${userId}`, params);
  }

  async findProfiles<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<GetProfilesResponse>> {
    return this.find<GetProfilesResponse, P>("", params);
  }
}

export default BaseProfilesAPI;
