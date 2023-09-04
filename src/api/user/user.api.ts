import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseUserAPI extends BaseAPI {
  async createUser<CreateUserRequest>(
    data: CreateUserRequest
  ): Promise<UserCreatedResponse | APIError> {
    try {
      const response = await this.post<UserCreatedResponse, CreateUserRequest>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getUsers(
    params?: QueryParams
  ): Promise<GetUsersResponseWithStatus | APIError> {
    try {
      const users = await this.get<GetUsersResponse>("", params);
      const usersWithStatus = users.data.map((product) =>
        Object.assign({}, product, {
          status: statusParser(product),
        })
      );

      return {
        data: usersWithStatus,
        pagination: users.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getUser(
    userId: string,
    params?: QueryParams
  ): Promise<GetUserResponse | APIError> {
    try {
      return await this.get<GetUserResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateUser(
    userId: string,
    data: CreateUserRequest,
    params?: QueryParams
  ): Promise<UpdatedUserResponse | APIError> {
    try {
      return await this.put<UpdatedUserResponse, CreateUserRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteUser(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteUserResponse | APIError> {
    try {
      return await this.delete<DeleteUserResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findUsers<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseUserAPI;
