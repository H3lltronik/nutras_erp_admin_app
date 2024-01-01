import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BasePurchaseOrderAPI extends BaseAPI {
  async createPurchaseOrder<CreatePurchaseOrderRequest>(
    data: CreatePurchaseOrderRequest
  ): Promise<PurchaseOrderCreatedResponse | APIError> {
    try {
      const response = await this.post<
        PurchaseOrderCreatedResponse,
        CreatePurchaseOrderRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getPurchaseOrders(
    params?: QueryParams
  ): Promise<GetPurchaseOrdersResponseWithStatus | APIError> {
    try {
      const purchaseOrders = await this.get<GetPurchaseOrdersResponse>("", params);
      console.log("[getPurchaseOrders] purchaseOrders: ", purchaseOrders);
      const purchaseOrdersWithStatus = purchaseOrders.items.map((purchaseOrder) =>
        Object.assign({}, purchaseOrder, {
          status: statusParser(purchaseOrder),
        })
      );

      const result = {
        data: purchaseOrdersWithStatus,
        pagination: purchaseOrders.paginationMetadata,
      };
      console.log("[getPurchaseOrders] result: ", result);
      return result;
    } catch (error) {
      console.log("Error getting purchaseOrders", error);
      return handleAPIError(error);
    }
  }

  async getPurchaseOrder(
    userId: string,
    params?: QueryParams
  ): Promise<GetPurchaseOrderResponse | APIError> {
    try {
      return await this.get<GetPurchaseOrderResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updatePurchaseOrder(
    userId: string,
    data: CreatePurchaseOrderRequest,
    params?: QueryParams
  ): Promise<UpdatedPurchaseOrderResponse | APIError> {
    try {
      return await this.patch<UpdatedPurchaseOrderResponse, CreatePurchaseOrderRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deletePurchaseOrder(
    userId: string,
    params?: QueryParams
  ): Promise<DeletePurchaseOrderResponse | APIError> {
    try {
      return await this.delete<DeletePurchaseOrderResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findPurchaseOrders<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BasePurchaseOrderAPI;
