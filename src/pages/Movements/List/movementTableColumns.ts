import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const MovementListColumns: ColumnsType<Movement> = [
  {
    title: "ID",
    dataIndex: "partidaId",
    key: "partidaId",
    width: 150,
    showSorterTooltip: false,
  },
  {
    title: "ID movimiento",
    dataIndex: "code",
    key: "code",
    showSorterTooltip: false,
  },
  {
    title: "OT Relacionada",
    dataIndex: "ot",
    key: "ot",
    render(_value, record) {
      return record.ot?.folio;
    },
    showSorterTooltip: false,
  },
  {
    title: "Concepto",
    dataIndex: "concept",
    key: "concept",
    showSorterTooltip: false,
  },
  {
    title: "Tipo de movimiento",
    dataIndex: "type",
    key: "type",
    showSorterTooltip: false,
  },
  {
    title: "Origen",
    dataIndex: "origin",
    key: "origin",
    showSorterTooltip: false,
  },
  {
    title: "Destino",
    dataIndex: "destination",
    key: "destination",
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];