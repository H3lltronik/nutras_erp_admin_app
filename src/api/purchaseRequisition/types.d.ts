import { WorkOrder } from "../workOrder/types";

interface PurchaseRequisitionProduct {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  product_id: string;
  quantity: number;
  purchase_requisition_id: string;
}

type PurchaseRequisitionProductFormItem = Omit<
  PurchaseRequisitionProduct,
  | "id"
  | "partidaId"
  | "purchase_requisition_id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "isDraft"
  | "isPublished"
>;

interface PurchaseRequisition {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  work_order_id: string;
  user_id: string;
  motive: string;
  user: User;
  work_orders: WorkOrder;
  purchase_requisition_products: PurchaseRequisitionProduct[];
}

type PurchaseRequisitionFormItem = Omit<
  PurchaseRequisition,
  | "id"
  | "partidaId"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "purchase_requisition_products"
> & {
  purchase_requisition_products?: PurchaseRequisitionProductFormItem[];
};

type CreatePurchaseRequisitionRequest = Omit<
  PurchaseRequisition,
  "id" | "partidaId" | "createdAt" | "updatedAt" | "deletedAt"
>;
type UpdatePurchaseRequisitionRequest = PurchaseRequisition;

type GetPurchaseRequisitionResponse = PurchaseRequisition;

type GetPurchaseRequisitionsResponse = {
  data: PurchaseRequisition[];
  pagination: Pagination;
};

type UpdatedPurchaseRequisitionResponse = PurchaseRequisition;

type DeletePurchaseRequisitionResponse = PurchaseRequisition;

type PurchaseRequisitionCreatedResponse = PurchaseRequisition;

// parsed

type PurchaseRequisitionWithStatus = PurchaseRequisition & { status: string };
type PurchaseRequisitionsWithStatus = PurchaseRequisitionWithStatus[];
type GetPurchaseRequisitionsResponseWithStatus = {
  data: PurchaseRequisitionsWithStatus;
  pagination: Pagination;
};
