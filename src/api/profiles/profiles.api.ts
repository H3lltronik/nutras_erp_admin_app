import BaseAPI from "../common/ApiBase";

class BaseProfilesAPI extends BaseAPI {
    // async createUser<CreateUserRequest>(data: CreateUserRequest): Promise<UserCreatedResponse> {
    //   return this.post<UserCreatedResponse, CreateUserRequest>('', data);
    // }
    async createProfile<CreateProfileRequest>(data: CreateProfileRequest): Promise<ProfileCreatedResponse> {
      return this.post<ProfileCreatedResponse, CreateProfileRequest>('', data);
    }

    async getProfiles(params?: QueryParams): Promise<GetProfilesResponse> {
        return this.get<GetProfilesResponse>('', params);
    }
  
    async getProfile(userId: string, params?: QueryParams): Promise<unknown> {
      return this.get<unknown>(`/${userId}`, params);
    }
  
    async updateProfile<U>(userId: string, data: U, params?: QueryParams): Promise<void> {
      return this.put<void, U>(`/${userId}`, data, params);
    }
  
    async deleteProfile(userId: string, params?: QueryParams): Promise<void> {
      return this.delete<void>(`/${userId}`, params);
    }
    
    async findProfiles<P = object>(params?: QueryParams<P>): Promise<PaginatedResponse<unknown>> {
      return this.find<unknown, P>('', params);
    }
}
  
export default BaseProfilesAPI;
  