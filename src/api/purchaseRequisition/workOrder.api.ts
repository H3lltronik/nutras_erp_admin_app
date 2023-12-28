import dayjs from "dayjs";
import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";
import {
  CreatePurchaseRequisitionRequest,
  DeletePurchaseRequisitionResponse,
  GetPurchaseRequisitionResponse,
  GetPurchaseRequisitionsResponse,
  GetPurchaseRequisitionsResponseWithStatus,
  PurchaseRequisitionCreatedResponse,
  UpdatedPurchaseRequisitionResponse,
} from "./types";

class BasePurchaseRequisitionAPI extends BaseAPI {
  async createPurchaseRequisition<CreatePurchaseRequisitionRequest>(
    data: CreatePurchaseRequisitionRequest
  ): Promise<PurchaseRequisitionCreatedResponse | APIError> {
    try {
      const response = await this.post<
        PurchaseRequisitionCreatedResponse,
        CreatePurchaseRequisitionRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getPurchaseRequisitions(
    params?: QueryParams
  ): Promise<GetPurchaseRequisitionsResponseWithStatus | APIError> {
    try {
      console.log("[getPurchaseRequisitions] params", params);
      const PurchaseRequisitions =
        await this.get<GetPurchaseRequisitionsResponse>("", params);
      const PurchaseRequisitionsWithStatus = PurchaseRequisitions.data.map(
        (PurchaseRequisition) =>
          Object.assign({}, PurchaseRequisition, {
            status: statusParser(PurchaseRequisition),
          })
      );

      return {
        data: PurchaseRequisitionsWithStatus,
        pagination: PurchaseRequisitions.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getPurchaseRequisition(
    userId: string,
    params?: QueryParams
  ): Promise<GetPurchaseRequisitionResponse | APIError> {
    try {
      const PurchaseRequisition =
        await this.get<GetPurchaseRequisitionResponse>(`/${userId}`, params);

      PurchaseRequisition.clientRequestDate = dayjs(
        PurchaseRequisition.clientRequestDate
      );
      PurchaseRequisition.internDueDate = dayjs(
        PurchaseRequisition.internDueDate
      );
      console.log("PurchaseRequisition", PurchaseRequisition);

      return PurchaseRequisition;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updatePurchaseRequisition(
    userId: string,
    data: CreatePurchaseRequisitionRequest,
    params?: QueryParams
  ): Promise<UpdatedPurchaseRequisitionResponse | APIError> {
    try {
      return await this.patch<
        UpdatedPurchaseRequisitionResponse,
        CreatePurchaseRequisitionRequest
      >(`/${userId}`, data, params);
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deletePurchaseRequisition(
    userId: string,
    params?: QueryParams
  ): Promise<DeletePurchaseRequisitionResponse | APIError> {
    try {
      return await this.delete<DeletePurchaseRequisitionResponse>(
        `/${userId}`,
        params
      );
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findPurchaseRequisitions<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BasePurchaseRequisitionAPI;
