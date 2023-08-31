interface Measurement {
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    id: string;
    name: string;
}

type GetMeasurementResponse = Measurement
type GetMeasurementsResponse = {
    data: Measurement[];
    pagination: Pagination;
};

type MeasurementCreatedResponse = Measurement

interface CreateMeasurementRequest {
    name: string;
}