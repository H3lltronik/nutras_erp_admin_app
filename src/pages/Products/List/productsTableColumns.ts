import type { ColumnsType } from 'antd/es/table';

export const productListColumns: ColumnsType<Product> = [
    {
      title: "Partida ID",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
      sorter: (a, b) => a.partidaId - b.partidaId,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
  ];