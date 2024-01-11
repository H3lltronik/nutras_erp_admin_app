interface MovementConcept {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  movementType: MovementType;
  movementTypeId: string;
}

interface MovementType {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  action: 'input' | 'output' | 'move';
}

type GetMovementConceptsResponse = MovementConcept[];
type GetMovementTypesResponse = MovementType[];

type GetMovementConceptsResponseData = {
  data: GetMovementConceptsResponse;
};

type GetMovementTypesResponseData = {
  data: GetMovementTypesResponse;
};
