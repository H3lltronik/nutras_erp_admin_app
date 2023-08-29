/**
 * ENTITIES
 */
interface Pagination {
  totalItems: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
} 


// ERROR

interface APIError {
  statusCode: number;
  messages: string[];
}