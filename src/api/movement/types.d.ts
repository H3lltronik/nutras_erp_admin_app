interface Movement {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  code: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  ot: WorkOrder;
  otId: string;
  date: string;
  concept: string;
  type: string;
  oc: any | null;
  ocId: number | null;
  origin: string;
  destination: string;
}

type CreateMovementRequest = Omit<Movement, "id">;
type UpdateMovementRequest = Movement;

type GetMovementResponse = Movement;

type GetMovementsResponse = {
  items: Movement[];
  paginationMetadata: Pagination;
};

type UpdatedMovementResponse = Movement;

type DeleteMovementResponse = Movement;

type MovementCreatedResponse = Movement;

// parsed

type MovementWithStatus = Movement & { status: string };
type MovementsWithStatus = MovementWithStatus[];
type GetMovementsResponseWithStatus = {
  data: MovementsWithStatus;
  pagination: Pagination;
};

type MovementEntryType = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
};

type GetMovementEntryTypesResponse = MovementEntryType[];
