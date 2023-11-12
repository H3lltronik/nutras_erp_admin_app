import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetProvidersParams = QueryParams &
  DraftMode &
  SoftDelete & {
    nameSearch?: string;
    codeSearch?: string;
    providerSearch?: string;
  };

class BaseProviderAPI extends BaseAPI {
  async createProvider<CreateProviderRequest>(
    data: CreateProviderRequest
  ): Promise<ProviderCreatedResponse | APIError> {
    try {
      const response = await this.post<
        ProviderCreatedResponse,
        CreateProviderRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getProviders(
    params?: GetProvidersParams
  ): Promise<GetProvidersResponseWithStatus | APIError> {
    try {
      const products = await this.get<GetProvidersResponse>("", params);
      const productsWithStatus = products.data.map((product) =>
        Object.assign({}, product, {
          status: statusParser(product),
        })
      );

      return {
        data: productsWithStatus,
        pagination: products.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getProvider(
    userId: string,
    params?: QueryParams
  ): Promise<GetProviderResponse | APIError> {
    try {
      return await this.get<GetProviderResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateProvider(
    userId: string,
    data: CreateProviderRequest,
    params?: QueryParams
  ): Promise<UpdatedProviderResponse | APIError> {
    try {
      return await this.patch<UpdatedProviderResponse, CreateProviderRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteProvider(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteProviderResponse | APIError> {
    try {
      return await this.delete<DeleteProviderResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findProviders<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseProviderAPI;
