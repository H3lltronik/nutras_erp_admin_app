interface PurchaseOrder {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  folio: string;
  note: string;
  userId: string;
  user: User;
  work_orders?: Array<PurchaseOrder>;
}

type CreatePurchaseOrderRequest = Omit<PurchaseOrder, "id">;
type UpdatePurchaseOrderRequest = PurchaseOrder;

type GetPurchaseOrderResponse = PurchaseOrder;

type GetPurchaseOrdersResponse = {
  data: PurchaseOrder[];
  pagination: Pagination;
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
