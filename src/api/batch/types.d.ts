interface Batch {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  code: string;
  isDraft: boolean;
  isPublished: boolean;
  description: string;
  quantity: number;
  partidaId: number;
  expirationDate: string;
  productId: string;
  loteEntryTypeId: string;
}

type CreateBatchRequest = Omit<Batch, "id">;
type UpdateBatchRequest = Batch;

type GetBatchResponse = Batch;

type GetBatchesResponse = {
  items: Batch[];
  paginationMetadata: Pagination;
};

type UpdatedBatchResponse = Batch;

type DeleteBatchResponse = Batch;

type BatchCreatedResponse = Batch;

// parsed

type BatchWithStatus = Batch & { status: string };
type BatchesWithStatus = BatchWithStatus[];
type GetBatchesResponseWithStatus = {
  data: BatchesWithStatus;
  pagination: Pagination;
};

type BatchEntryType = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
};

type GetBatchEntryTypesResponse = BatchEntryType[];
