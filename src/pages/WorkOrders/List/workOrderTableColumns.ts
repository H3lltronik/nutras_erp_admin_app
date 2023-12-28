import type { ColumnsType } from "antd/es/table";
import { WorkOrder } from "../../../api/workOrder/types";
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
    sorter: (a, b) =>
      a.folio && b.folio ? alphabetically(a.folio, b.folio) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Solicitud de trabajo",
    dataIndex: "work_request",
    key: "work_request",
    render(_value, record) {
      return record.work_request?.folio;
    },
    sorter: (a, b) =>
      a.work_request?.folio && b.work_request?.folio
        ? alphabetically(a.work_request?.folio, b.work_request?.folio)
        : 0,
    showSorterTooltip: false,
  },
  {
    title: "Fecha de cliente",
    dataIndex: "clientRequestDate",
    key: "clientRequestDate",
    render(_value, record) {
      return record.internDueDate?.format("DD/MM/YYYY");
    },
    sorter: (a, b) =>
      a.clientRequestDate && b.clientRequestDate
        ? a.clientRequestDate.unix() - b.clientRequestDate.unix()
        : 0,
    showSorterTooltip: false,
  },
  {
    title: "Fecha interna",
    dataIndex: "internDueDate",
    key: "internDueDate",
    render(_value, record) {
      return record.internDueDate?.format("DD/MM/YYYY");
    },
    sorter: (a, b) =>
      a.internDueDate && b.internDueDate
        ? a.internDueDate.unix() - b.internDueDate.unix()
        : 0,
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
    dataIndex: "service_type",
    key: "service_type",
    sorter: (a, b) =>
      a.service_type && b.service_type
        ? alphabetically(a.service_type.name, a.service_type.name)
        : 0,
    render(_value, record) {
      return record.service_type?.name;
    },
    showSorterTooltip: false,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
