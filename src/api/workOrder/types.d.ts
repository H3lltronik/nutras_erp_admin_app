import dayjs from "dayjs";

interface WorkOrder {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  folio: string;
  clientRequestDate: dayjs.Dayjs;
  internDueDate: dayjs.Dayjs;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  work_request_id: string;
  work_request: WorkRequest;
  notes: string;
  service_type_id: string;
  service_type: WorkOrderServiceType;
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

// -----------------------------------------------

type WorkOrderServiceType = {
  id: string;
  name: string;
  partidaId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type WorkOrderServiceTypeCreatedResponse = WorkOrderServiceType;

type CreateWorkOrderServiceTypeRequest = Omit<WorkOrderServiceType, "id">;
type UpdateWorkOrderServiceTypeRequest = WorkOrderServiceType;

type GetWorkOrderServiceTypeResponse = WorkOrderServiceType;

type GetWorkOrderServiceTypesResponse = {
  data: WorkOrderServiceType[];
};

type UpdatedWorkOrderServiceTypeResponse = WorkOrderServiceType;

type DeleteWorkOrderServiceTypeResponse = WorkOrderServiceType;
