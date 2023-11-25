interface BaseEntity {
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: string;
    partidaId: number;
}

interface DraftEntity {
    isDraft: boolean;
    isPublished: boolean;
}

interface BaseDraftEntity extends BaseEntity, DraftEntity {}

interface GetEntityResponse<T> {
    data: T[];
    pagination: Pagination;
}