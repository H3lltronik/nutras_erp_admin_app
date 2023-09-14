import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const WorkRequestListColumns: ColumnsType<WorkRequest> = [
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
    title: "Ordenes de trabajo",
    dataIndex: "purchaseOrders",
    key: "purchaseOrders",
    render(_value, record) {
      return record.ots.length;
    },
    sorter: (a, b) => Number(a.ots.length) - Number(b.ots.length),
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
