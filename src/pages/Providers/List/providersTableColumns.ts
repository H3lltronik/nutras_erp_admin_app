import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const providerListColumns: ColumnsType<Provider> = [
  {
    title: "Código",
    dataIndex: "code",
    key: "code",
    width: 150,
    sorter: (a, b) => {
      if (a.code && b.code) {
        return a.code.localeCompare(b.code);
      }
      return 0;
    },
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
    title: "Teléfono",
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
    title: "RFC",
    dataIndex: "RFC",
    key: "RFC",
    sorter: (a, b) =>
      a.RFC && b.RFC ? alphabetically(a.RFC, b.RFC) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
