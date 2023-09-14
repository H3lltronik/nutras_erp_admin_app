interface WorkOrder {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  folio: string;
  clientRequestDate: string;
  internDueDate: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  stId: string;
  st: WorkOrder;
  notes: string;
  serviceType: string;
}

type CreateWorkOrderRequest = Omit<WorkOrder, "id">;
type UpdateWorkOrderRequest = WorkOrder;

type GetWorkOrderResponse = WorkOrder;

type GetWorkOrdersResponse = {
  data: WorkOrder[];
  pagination: Pagination;
};

type UpdatedWorkOrderResponse = WorkOrder;

type DeleteWorkOrderResponse = WorkOrder;

type WorkOrderCreatedResponse = WorkOrder;

// parsed

type WorkOrderWithStatus = WorkOrder & { status: string };
type WorkOrdersWithStatus = WorkOrderWithStatus[];
type GetWorkOrdersResponseWithStatus = {
    data: WorkOrdersWithStatus;
    pagination: Pagination;
};