import type { ColumnsType } from "antd/es/table";

export const usersListColumns: ColumnsType<Product> = [
  {
    title: "Código de usuario",
    dataIndex: "partidaId",
    key: "partidaId",
    width: 150,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Perfil",
    dataIndex: "profile",
    key: "profileName",
    render: (profile: Profile) => profile && profile.name,
  },
  {
    title: "Departamento",
    dataIndex: "department",
    key: "departmentName",
    render: (department: Department) => department && department.name,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
