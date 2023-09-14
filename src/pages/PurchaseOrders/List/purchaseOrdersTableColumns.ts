import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const purchaseOrderListColumns: ColumnsType<PurchaseOrder> = [
  {
    title: "ID",
    dataIndex: "partidaId",
    key: "partidaId",
    width: 150,
    sorter: (a, b) => a.partidaId - b.partidaId,
    showSorterTooltip: false,
  },
  {
    title: "Folio",
    dataIndex: "folio",
    key: "folio",
    sorter: (a, b) => (a.folio && b.folio ? alphabetically(a.folio, b.folio) : 0),
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
    title: "Orden de trabajo",
    dataIndex: "ot",
    key: "ot",
    render(_value, record) {
      return record.ot?.id;
    },
    showSorterTooltip: false,
  },
  {
    title: "Productos",
    dataIndex: "products",
    key: "products",
    render(_value, record) {
      return record.ocProducts.length;
    },
    sorter: (a, b) => Number(a.ocProducts.length) - Number(b.ocProducts.length),
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
