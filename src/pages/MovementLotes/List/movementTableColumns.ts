import type { ColumnsType } from "antd/es/table";

export const MovementLotesListColumns: ColumnsType<MovementLotes> = [
  {
    title: "ID",
    dataIndex: "partidaId",
    key: "partidaId",
    width: 150,
    showSorterTooltip: false,
  },
  {
    title: "Folio",
    dataIndex: "folio",
    key: "folio",
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
  // {
  //   title: "Lote",
  //   dataIndex: "lote",
  //   key: "lote",
  //   render(_value, record) {
  //     return record.inventoryMovement.code;
  //   },
  // },
];
