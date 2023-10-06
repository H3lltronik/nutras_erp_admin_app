import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const providerListColumns: ColumnsType<Provider> = [
  {
    title: "ID",
    dataIndex: "partidaId",
    key: "partidaId",
    width: 150,
    sorter: (a, b) => a.partidaId - b.partidaId,
    showSorterTooltip: false,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => (a.name && b.name ? alphabetically(a.name, b.name) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
    sorter: (a, b) =>
      a.description && b.description
        ? alphabetically(a.description, b.description)
        : 0,
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
