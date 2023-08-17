import BaseAPI from "../common/ApiBase";

class BaseUserAPI extends BaseAPI {
    async createUser<U>(data: U): Promise<void> {
      return this.post<void, U>('', data);
    }

    async getUsers(params?: QueryParams): Promise<GetUserResponse> {
        return this.get<GetUserResponse>('', params);
    }
  
    async getUser(userId: string, params?: QueryParams): Promise<unknown> {
      return this.get<unknown>(`/${userId}`, params);
    }
  
    async updateUser<U>(userId: string, data: U, params?: QueryParams): Promise<void> {
      return this.put<void, U>(`/${userId}`, data, params);
    }
  
    async deleteUser(userId: string, params?: QueryParams): Promise<void> {
      return this.delete<void>(`/${userId}`, params);
    }
    
    async findUsers<P = object>(params?: QueryParams<P>): Promise<PaginatedResponse<unknown>> {
      return this.find<unknown, P>('', params);
    }
}
  
export default BaseUserAPI;
  