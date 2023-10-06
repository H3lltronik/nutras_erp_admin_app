import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const productListColumns: ColumnsType<Product> = [
  {
    title: "ID",
    dataIndex: "partidaId",
    key: "partidaId",
    width: 150,
    sorter: (a, b) => a.partidaId - b.partidaId,
    showSorterTooltip: false,
  },
  {
    title: "Codigo",
    dataIndex: "code",
    key: "code",
    sorter: (a, b) => (a.code && b.code ? alphabetically(a.code, b.code) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Nombre",
    dataIndex: "commonName",
    key: "commonName",
    sorter: (a, b) => (a.name && b.name ? alphabetically(a.name, b.name) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Proveedor",
    dataIndex: "provider",
    key: "provider",
    render(_value, record) {
      return record.provider?.name;
    },
  },
  {
    title: "Unidad",
    dataIndex: "unit",
    key: "unit",
    render(_value, record) {
      return record.unit?.name;
    },
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
