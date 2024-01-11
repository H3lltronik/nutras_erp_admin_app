interface MovementLotes {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  isDraft: boolean;
  isPublished: boolean;
  partidaId: number;
  loteId: string;
  folio: string;
  quantity: number;
  inventoryMovementId: string;
  inventoryMovement: Movement;
}

type CreateMovementLotesRequest = Omit<MovementLotes, "id">;
type UpdateMovementLotesRequest = MovementLotes;

type GetMovementLotesResponse = MovementLotes;

type GetMovementsLotesResponse = {
  items: MovementLotes[];
  paginationMetadata: Pagination;
};

type UpdatedMovementLotesResponse = MovementLotes;

type DeleteMovementLotesResponse = MovementLotes;

type MovementLotesCreatedResponse = MovementLotes;

// parsed

type MovementLoteWithStatus = MovementLotes & { status: string };
type MovementLotesWithStatus = MovementWithStatus[];
type GetMovementLotesResponseWithStatus = {
  data: MovementLotesWithStatus;
  pagination: Pagination;
};
