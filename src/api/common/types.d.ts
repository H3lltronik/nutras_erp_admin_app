interface PaginationParams {
    page?: number;
    perPage?: number;
  }
  
type QueryParams<T = object> = PaginationParams & T;
  
interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}
  
interface IRESTfulAPI {
    get<T, P = object>(url: string, params?: QueryParams<P>): Promise<T>;
    find<T, P = object>(url: string, params?: QueryParams<P>): Promise<PaginatedResponse<T>>;
    post<T, U, P = object>(url: string, data: U, params?: QueryParams<P>): Promise<T>;
    put<T, U, P = object>(url: string, data: U, params?: QueryParams<P>): Promise<T>;
    delete<T, P = object>(url: string, params?: QueryParams<P>): Promise<T>;
}
  