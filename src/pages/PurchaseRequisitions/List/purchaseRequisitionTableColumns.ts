import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { PurchaseRequisition } from "../../../api/purchaseRequisition/types";
import { alphabetically } from "../../../lib/sorters";

export const PurchaseRequisitionListColumns: ColumnsType<PurchaseRequisition> =
  [
    {
      title: "ID",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
      sorter: (a, b) => a.partidaId - b.partidaId,
      showSorterTooltip: false,
    },
    {
      title: "Orden de trabajo",
      dataIndex: "work_orders",
      key: "work_orders",
      render(_value, record) {
        try {
          return record.work_orders.folio;
        } catch (error) {
          return "No disponible";
        }
      },
      sorter: (a, b) =>
        a.work_orders.folio && b.work_orders.folio
          ? alphabetically(a.work_orders.folio, b.work_orders.folio)
          : 0,
      showSorterTooltip: false,
    },
    {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
      render(_value, record) {
        try {
          return record.user.name;
        } catch (error) {
          return "No disponible";
        }
      },
      sorter: (a, b) =>
        a.user.name && b.user.name
          ? alphabetically(a.user.name, b.user.name)
          : 0,
      showSorterTooltip: false,
    },
    {
      title: "Motivo",
      dataIndex: "motive",
      key: "motive",
      sorter: (a, b) =>
        a.motive && b.motive ? alphabetically(a.motive, b.motive) : 0,
      showSorterTooltip: false,
    },
    {
      title: "Fecha de creación",
      dataIndex: "createdAt",
      key: "createdAt",
      render(_value, record) {
        try {
          return dayjs(record.createdAt).format("DD/MM/YYYY");
        } catch (error) {
          return "No disponible";
        }
      },
      showSorterTooltip: false,
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
    },
  ];
