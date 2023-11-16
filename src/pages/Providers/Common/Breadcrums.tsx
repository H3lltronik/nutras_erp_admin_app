import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const ProvidersManageBreadcrumb = () => {
  const navigate = useNavigate();

  const providersManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Proveedors",
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
      title: "Administración",
    },
    {
      title: "Proveedors",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={providersListBreadcrumb} />
  );
};
