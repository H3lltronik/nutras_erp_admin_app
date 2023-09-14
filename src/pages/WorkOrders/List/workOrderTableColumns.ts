import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const WorkOrderListColumns: ColumnsType<WorkOrder> = [
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
    title: "Solicitud de trabajo",
    dataIndex: "purchaseOrders",
    key: "purchaseOrders",
    render(_value, record) {
      return record.st?.folio;
    },
    sorter: (a, b) => (a.st?.folio && b.st?.folio ? alphabetically(a.st?.folio, b.st?.folio) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Fecha de cliente",
    dataIndex: "clientRequestDate",
    key: "clientRequestDate",
    sorter: (a, b) => (a.clientRequestDate && b.clientRequestDate ? alphabetically(a.clientRequestDate, b.clientRequestDate) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Fecha interna",
    dataIndex: "internDueDate",
    key: "internDueDate",
    sorter: (a, b) => (a.internDueDate && b.internDueDate ? alphabetically(a.internDueDate, b.internDueDate) : 0),
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
      return record.product?.commonName;
    },
    showSorterTooltip: false,
  },
  {
    title: "Notas",
    dataIndex: "notes",
    key: "notes",
    showSorterTooltip: false,
  },
  {
    title: "Tipo de servicio",
    dataIndex: "serviceType",
    key: "serviceType",
    sorter: (a, b) => (a.serviceType && b.serviceType ? alphabetically(a.serviceType, b.serviceType) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
