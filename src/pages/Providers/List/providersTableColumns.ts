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
    title: "Servicio",
    dataIndex: "service",
    key: "service",
    sorter: (a, b) =>
      a.service && b.service ? alphabetically(a.service, b.service) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
    sorter: (a, b) =>
      a.phone && b.phone ? alphabetically(a.phone, b.phone) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) =>
      a.email && b.email ? alphabetically(a.email, b.email) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
