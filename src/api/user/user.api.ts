import axios from "axios";
import { showToast } from "../../lib/notify";
import BaseAPI from "../common/ApiBase";

class BaseUserAPI extends BaseAPI {
    async createUser<CreateUserRequest>(data: CreateUserRequest): Promise<UserCreatedResponse|null> {
        try {
            const response = await this.post<UserCreatedResponse, CreateUserRequest>('', data);
            return response;
        } catch (error) {
            this.handleError(error);
            return null
        }
    }

    async getUsers(params?: QueryParams): Promise<GetUsersResponse|null> {
        try {
            return await this.get<GetUsersResponse>('', params);
        } catch (error) {
            this.handleError(error);
            return null
        }
    }

    async getUser(userId: string, params?: QueryParams): Promise<GetUserResponse|null> {
        try {
            return await this.get<GetUserResponse>(`/${userId}`, params);
        } catch (error) {
            this.handleError(error);
            return null
        }
    }

    async updateUser(userId: string, data: CreateUserRequest, params?: QueryParams): Promise<UpdatedUserResponse|null> {
        try {
            return await this.put<UpdatedUserResponse, CreateUserRequest>(`/${userId}`, data, params);
        } catch (error) {
          console.log("error update")
            this.handleError(error);
            return null
        }
    }

    async deleteUser(userId: string, params?: QueryParams): Promise<void> {
        try {
            return await this.delete<void>(`/${userId}`, params);
        } catch (error) {
            this.handleError(error);
        }
    }

    async findUsers<P = object>(params?: QueryParams<P>): Promise<PaginatedResponse<unknown>|null> {
        try {
            return await this.find<unknown, P>('', params);
        } catch (error) {
            this.handleError(error);
            return null
        }
    }

    private handleError(error: any) {
        if (axios.isAxiosError(error)) {
            const { response } = error;
            if (response) {
                if (response.data.message) {
                    if (Array.isArray(response.data.message)) {
                        response.data.message.forEach((message: string) => {
                            showToast(message, 'error');
                        });
                    } else if (typeof response.data.message === 'string') {
                        showToast(response.data.message, 'error');
                    } else {
                        showToast('Error', 'error');
                    }
                }
                throw response.data;
            } else {
                showToast('Error', 'error');
            }
        } else {
            showToast('Error', 'error');
        }
        throw error;
    }
}

export default BaseUserAPI;
