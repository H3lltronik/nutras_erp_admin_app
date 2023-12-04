interface Batch {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  code: string;
  product: Product;
  productId: string;
  quantity: number;
  entryType: string;
  expirationDate: string;
  user: User;
  userId: string;
  isActive: boolean;
}

type CreateBatchRequest = Omit<Batch, "id">;
type UpdateBatchRequest = Batch;

type GetBatchResponse = Batch;

type GetBatchesResponse = {
  data: Batch[];
  pagination: Pagination;
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