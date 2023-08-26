/**
 * ENTITIES
 */
interface Pagination {
  totalItems: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
} 

interface Product {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  id: string;
  code: string;
  type: string;
  description: string;
}
interface Measurement {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  id: string;
  name: string;
}

/**
 * API RESPONSES
 */

type GetProductResponse = Product
type GetProductsResponse = Product[]
type GetMeasurementResponse = Measurement
type GetMeasurementsResponse = Measurement[]




type ProductCreatedResponse = Product
type MeasurementCreatedResponse = Measurement


interface CreateProductRequest {
  code: string;
  type: string;
  description: string;
}
interface CreateMeasurementRequest {
  name: string;
}


// ERROR

interface APIError {
  statusCode: number;
  messages: string[];
}