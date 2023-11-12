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
  let status = entityStatuses.UNKNOWN;

  if (entity.isPublished) status = entityStatuses.PUBLISHED;
  if (entity.isDraft) status = entityStatuses.DRAFT;
  if (entity.deletedAt) status = entityStatuses.DELETED;

  return status;
};

export function jsonToUrlWithGetKey(
  baseUrl: string,
  json: Record<string, unknown>,
  getKey: string
): string {
  const params = new URLSearchParams();
  params.append(getKey, JSON.stringify(json));
  return `${baseUrl}?${params.toString()}`;
}

export function urlWithGetKeyToJson(
  url: string,
  getKey: string
): Record<string, unknown> | null {
  const params = new URLSearchParams(url.split("?")[1]);
  const keyValue = params.get(getKey);
  if (keyValue) {
    try {
      return JSON.parse(keyValue);
    } catch (error) {
      return null;
    }
  }
  return null;
}
