interface Department {
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    id: string
    partidaId: number
    name: string
}

type GetDepartmentsResponse = {
    data: Department[]
    pagination: Pagination
}

type GetDepartmentResponse = Department