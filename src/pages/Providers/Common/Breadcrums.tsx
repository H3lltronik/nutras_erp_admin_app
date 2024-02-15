import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const ProvidersManageBreadcrumb = () => {
  const navigate = useNavigate();

  const providersManageBreadcrumb: ItemType[] = [
    {
      title: "Compras",
    },
    {
      title: "Proveedores",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/providers");
      },
      href: "/admin/providers",
    },
    {
      title: "Crear - Editar proveedor",
    },
  ];
  return (
    <Breadcrumb
      style={{ margin: "16px 0" }}
      items={providersManageBreadcrumb}
    />
  );
};

export const ProvidersListBreadcrumb = () => {
  const providersListBreadcrumb: ItemType[] = [
    {
      title: "Compras",
    },
    {
      title: "Proveedores",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={providersListBreadcrumb} />
  );
};
