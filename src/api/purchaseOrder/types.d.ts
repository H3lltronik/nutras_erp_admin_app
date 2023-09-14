interface PurchaseOrder {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  folio: string;
  userId: string;
  user: User;
  otId: User;
  ot: any;
  ocProducts: Array<PurchaseOrder>;
}

interface PurchaseOrderProduct {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  produtcId: string,
  product: Product,
  ocId: string,
  oc: PurchaseOrder,
  quantity: number
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