interface MovementConcept {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  movementType: MovementType;
}

interface MovementType {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
}

type GetMovementConceptsResponse = MovementConcept[];
type GetMovementTypesResponse = MovementType[];

type GetMovementConceptsResponseData = {
  data: GetMovementConceptsResponse;
};

type GetMovementTypesResponseData = {
  data: GetMovementTypesResponse;
};
