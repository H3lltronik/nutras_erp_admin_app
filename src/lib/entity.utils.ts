interface EntityWithDraftMetadata {
  isDraft: boolean;
  isPublished: boolean;
  deletedAt: string | null;
}

export const entityStatuses = {
  DRAFT: "Borrador",
  PUBLISHED: "Activo",
  DELETED: "Cancelado",
  UNKNOWN: "Indeterminado",
};

export const statusParser = (entity: EntityWithDraftMetadata): string => {
  if (entity.isPublished) return entityStatuses.PUBLISHED;
  if (entity.isDraft) return entityStatuses.DRAFT;
  if (entity.deletedAt) return entityStatuses.DELETED;

  return entityStatuses.UNKNOWN;
};
