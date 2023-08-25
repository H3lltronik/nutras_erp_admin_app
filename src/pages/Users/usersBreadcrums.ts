import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

export const usersBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/users");
      },
      href: "/admin/users",
    },
    {
      title: "Crear - Editar usuario",
    },
  ];