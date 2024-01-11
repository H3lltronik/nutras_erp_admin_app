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
  movementConcept: MovementConcept;
  oc: any | null;
  ocId: number | null;
  fromId: string;
  from: Warehouse;
  toId: string;
  to: Warehouse;
  inventoryMovementLotes: InventoryMovementLote[];
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
