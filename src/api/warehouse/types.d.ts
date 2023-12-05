interface Warehouse {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  address: string;
}

type GetWarehousesResponse = {
  data: Warehouse[];
};

type GetWarehouseResponse = Warehouse;
