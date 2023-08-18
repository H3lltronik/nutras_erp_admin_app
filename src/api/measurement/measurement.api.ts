import BaseAPI from "../common/ApiBase";

class BaseMeasurementAPI extends BaseAPI {
    async createMeasurement<CreateMeasurementRequest>(data: CreateMeasurementRequest): Promise<MeasurementCreatedResponse> {
      return this.post<MeasurementCreatedResponse, CreateMeasurementRequest>('', data);
    }

    async getMeasurements(params?: QueryParams): Promise<GetMeasurementsResponse> {
        return this.get<GetMeasurementsResponse>('', params);
    }
  
    async getMeasurement(measurementId: string, params?: QueryParams): Promise<unknown> {
      return this.get<unknown>(`/${measurementId}`, params);
    }
  
    async updateMeasurement<U>(measurementId: string, data: U, params?: QueryParams): Promise<void> {
      return this.put<void, U>(`/${measurementId}`, data, params);
    }
  
    async deleteMeasurement(measurementId: string, params?: QueryParams): Promise<void> {
      return this.delete<void>(`/${measurementId}`, params);
    }
    
    async findMeasurements<P = object>(params?: QueryParams<P>): Promise<PaginatedResponse<unknown>> {
      return this.find<unknown, P>('', params);
    }
}
  
export default BaseMeasurementAPI;
  