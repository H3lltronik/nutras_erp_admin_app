import type { ColumnsType } from 'antd/es/table';

export const productListColumns: ColumnsType<Product> = [
    {
      title: "Partida",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
      sorter: (a, b) => a.partidaId - b.partidaId,
      showSorterTooltip: false,
    },
    {
      title: "Nombre",
      dataIndex: "commonName",
      key: "commonName",
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
      showSorterTooltip: false,
    },
    {
      title: "Presentacion",
      dataIndex: "presentation",
      key: "presentation",
      showSorterTooltip: false,
      sorter: (a, b) => {
        if (a.presentation && b.presentation)
          return a.presentation.localeCompare(b.presentation);
        
        return 0;
      },
    },
    {
      title: "Unidad",
      dataIndex: "unit",
      key: "unit",
      render(_value, record) {
        return record.unit?.name;
      },
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
      showSorterTooltip: false,
    },
    {
      title: "Borrador",
      dataIndex: "isDraft",
      key: "isDraft",
      render(value) {
        return value ? "Si" : "No";
      },
    },
  ];