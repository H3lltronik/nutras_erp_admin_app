interface WorkRequest {
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

type CreateWorkRequestRequest = Omit<WorkRequest, "id">;
type UpdateWorkRequestRequest = WorkRequest;

type GetWorkRequestResponse = WorkRequest;

type GetWorkRequestsResponse = {
  data: WorkRequest[];
  pagination: Pagination;
};

type UpdatedWorkRequestResponse = WorkRequest;

type DeleteWorkRequestResponse = WorkRequest;

type WorkRequestCreatedResponse = WorkRequest;

// parsed

type WorkRequestWithStatus = WorkRequest & { status: string };
type WorkRequestsWithStatus = WorkRequestWithStatus[];
type GetWorkRequestsResponseWithStatus = {
  data: WorkRequestsWithStatus;
  pagination: Pagination;
};
