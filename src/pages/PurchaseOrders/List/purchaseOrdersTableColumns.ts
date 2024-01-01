import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const PurchaseOrderListColumns: ColumnsType<PurchaseOrder> = [
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
    sorter: (a, b) =>
      a.folio && b.folio ? alphabetically(a.folio, b.folio) : 0,
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
    title: "OT",
    dataIndex: "workOrderFolio",
    key: "workOrderFolio",
    render(_value, record) {
      return record.workOrder?.folio;
    },
    showSorterTooltip: false,
  },
  {
    title: "Motivo",
    dataIndex: "motive",
    key: "motive",
    width: 300,
    render(_value, record) {
      if (!record.motive) return "No disponible";
      return record.motive.length > 30
        ? record.motive.substring(0, 30) + "..."
        : record.motive;
    },
    sorter: (a, b) => (a.motive && b.motive ? alphabetically(a.motive, b.motive) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
