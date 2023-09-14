import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseWorkRequestAPI extends BaseAPI {
  async createWorkRequest<CreateWorkRequestRequest>(
    data: CreateWorkRequestRequest
  ): Promise<WorkRequestCreatedResponse | APIError> {
    try {
      const response = await this.post<
        WorkRequestCreatedResponse,
        CreateWorkRequestRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getWorkRequests(
    params?: QueryParams
  ): Promise<GetWorkRequestsResponseWithStatus | APIError> {
    try {
      const WorkRequests = await this.get<GetWorkRequestsResponse>("", params);
      const WorkRequestsWithStatus = WorkRequests.data.map((WorkRequest) =>
        Object.assign({}, WorkRequest, {
          status: statusParser(WorkRequest),
        })
      );

      return {
        data: WorkRequestsWithStatus,
        pagination: WorkRequests.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getWorkRequest(
    userId: string,
    params?: QueryParams
  ): Promise<GetWorkRequestResponse | APIError> {
    try {
      return await this.get<GetWorkRequestResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateWorkRequest(
    userId: string,
    data: CreateWorkRequestRequest,
    params?: QueryParams
  ): Promise<UpdatedWorkRequestResponse | APIError> {
    try {
      return await this.patch<UpdatedWorkRequestResponse, CreateWorkRequestRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteWorkRequest(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteWorkRequestResponse | APIError> {
    try {
      return await this.delete<DeleteWorkRequestResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findWorkRequests<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseWorkRequestAPI;
