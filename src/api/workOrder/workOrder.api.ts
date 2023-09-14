import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseWorkOrderAPI extends BaseAPI {
  async createWorkOrder<CreateWorkOrderRequest>(
    data: CreateWorkOrderRequest
  ): Promise<WorkOrderCreatedResponse | APIError> {
    try {
      const response = await this.post<
        WorkOrderCreatedResponse,
        CreateWorkOrderRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getWorkOrders(
    params?: QueryParams
  ): Promise<GetWorkOrdersResponseWithStatus | APIError> {
    try {
      const WorkOrders = await this.get<GetWorkOrdersResponse>("", params);
      const WorkOrdersWithStatus = WorkOrders.data.map((WorkOrder) =>
        Object.assign({}, WorkOrder, {
          status: statusParser(WorkOrder),
        })
      );

      return {
        data: WorkOrdersWithStatus,
        pagination: WorkOrders.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getWorkOrder(
    userId: string,
    params?: QueryParams
  ): Promise<GetWorkOrderResponse | APIError> {
    try {
      return await this.get<GetWorkOrderResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateWorkOrder(
    userId: string,
    data: CreateWorkOrderRequest,
    params?: QueryParams
  ): Promise<UpdatedWorkOrderResponse | APIError> {
    try {
      return await this.patch<UpdatedWorkOrderResponse, CreateWorkOrderRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteWorkOrder(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteWorkOrderResponse | APIError> {
    try {
      return await this.delete<DeleteWorkOrderResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findWorkOrders<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseWorkOrderAPI;
