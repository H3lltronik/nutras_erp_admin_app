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
    sorter: (a, b) => (a.commonName && b.commonName ? alphabetically(a.commonName, b.commonName) : 0),
    showSorterTooltip: false,
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
    title: "Tipo",
    dataIndex: "type",
    key: "type",
    render(_value, record) {
      return record.productType?.name;
    },
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
    title: "Kosher",
    dataIndex: "isKosher",
    key: "isKosher",
    render(_value, record) {
      return record.isKosher ? "Kosher" : "";
    },
  },
  {
    title: "Alergeno",
    dataIndex: "allergen",
    key: "allergen",
    render(_value, record) {
      return record.allergen ? "Alergeno" : "";
    },
  },
  {
    title: "Presentación",
    dataIndex: "presentation",
    key: "presentation",
    render(_value, record) {
      return record.presentation;
    },
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
