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
    title: "Nota",
    dataIndex: "note",
    key: "note",
    width: 300,
    render(_value, record) {
      if (!record.note) return "No disponible";
      return record.note.length > 30
        ? record.note.substring(0, 30) + "..."
        : record.note;
    },
    sorter: (a, b) => (a.note && b.note ? alphabetically(a.note, b.note) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
