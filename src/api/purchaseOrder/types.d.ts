interface PurchaseOrder {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  folio: string;
  motive: string;
  userId: string;
  user: User;
  workOrderId: string;
  workOrder: WorkOrder;
}

type CreatePurchaseOrderRequest = Omit<PurchaseOrder, "id">;
type UpdatePurchaseOrderRequest = PurchaseOrder;

type GetPurchaseOrderResponse = PurchaseOrder;

type GetPurchaseOrdersResponse = {
  items: PurchaseOrder[];
  paginationMetadata: Pagination;
};

type UpdatedPurchaseOrderResponse = PurchaseOrder;

type DeletePurchaseOrderResponse = PurchaseOrder;

type PurchaseOrderCreatedResponse = PurchaseOrder;

// parsed

type PurchaseOrderWithStatus = PurchaseOrder & { status: string };
type PurchaseOrdersWithStatus = PurchaseOrderWithStatus[];
type GetPurchaseOrdersResponseWithStatus = {
  data: PurchaseOrdersWithStatus;
  pagination: Pagination;
};
