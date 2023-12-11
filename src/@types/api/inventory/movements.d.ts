interface MovementConcept {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
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

type GetMovementConceptsResponseWData = {
  data: GetMovementConceptsResponse;
};

type GetMovementTypesResponseWData = {
  data: GetMovementTypesResponse;
};
