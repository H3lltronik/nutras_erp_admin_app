import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const batchListColumns: ColumnsType<Batch> = [
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
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
