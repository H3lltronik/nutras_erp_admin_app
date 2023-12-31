import type { ColumnsType } from "antd/es/table";

export const BatchListColumns: ColumnsType<Batch> = [
  {
    title: "Codigo",
    dataIndex: "code",
    key: "code",
    width: 150,
    showSorterTooltip: false,
  },
  {
    title: "Creador",
    dataIndex: "username",
    key: "username",
    render(_value, record) {
      return record.user?.name;
    },
    showSorterTooltip: false,
  },
  {
    title: "Producto",
    dataIndex: "product",
    key: "product",
    render(_value, record) {
      try {
        return record.product?.commonName;
      } catch (error) {
        return "";
      }
    },
    showSorterTooltip: false,
  },
  {
    title: "Fecha de expiracion",
    dataIndex: "expirationDate",
    key: "expirationDate",
    showSorterTooltip: false,
  },
  {
    title: "Activo",
    dataIndex: "isActive",
    key: "isActive",
    render(_value, record) {
      return record.isActive ? "Si" : "No";
    },
    showSorterTooltip: false,
  },
];
