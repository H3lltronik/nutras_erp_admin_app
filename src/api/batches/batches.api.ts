import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseBatchAPI extends BaseAPI {
  async createBatch<CreateBatchRequest>(
    data: CreateBatchRequest
  ): Promise<BatchCreatedResponse | APIError> {
    try {
      const response = await this.post<
        BatchCreatedResponse,
        CreateBatchRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getBatches(
    params?: QueryParams
  ): Promise<GetBatchesResponseWithStatus | APIError> {
    try {
      const Batches = await this.get<GetBatchesResponse>("", params);
      const BatchesWithStatus = Batches.data.map((Batch) =>
        Object.assign({}, Batch, {
          status: statusParser(Batch),
        })
      );

      return {
        data: BatchesWithStatus,
        pagination: Batches.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getBatch(
    userId: string,
    params?: QueryParams
  ): Promise<GetBatchResponse | APIError> {
    try {
      return await this.get<GetBatchResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateBatch(
    userId: string,
    data: CreateBatchRequest,
    params?: QueryParams
  ): Promise<UpdatedBatchResponse | APIError> {
    try {
      return await this.patch<UpdatedBatchResponse, CreateBatchRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteBatch(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteBatchResponse | APIError> {
    try {
      return await this.delete<DeleteBatchResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findBatches<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseBatchAPI;
