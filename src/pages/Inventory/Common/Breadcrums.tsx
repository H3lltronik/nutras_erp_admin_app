import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const InventoryManageBreadcrumb = () => {
  const navigate = useNavigate();

  const InventoriesManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Inventario",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/inventory");
      },
      href: "/admin/inventory",
    },
    {
      title: "Crear - Editar movimientos",
    },
  ];
  return (
    <Breadcrumb
      style={{ margin: "16px 0" }}
      items={InventoriesManageBreadcrumb}
    />
  );
};

export const InventoriesListBreadcrumb = () => {
  const InventoriesListBreadcrumb: ItemType[] = [
    {
      title: "Almacén",
    },
    {
      title: "Inventario",
    },
  ];
  return (
    <Breadcrumb
      style={{ margin: "16px 0" }}
      items={InventoriesListBreadcrumb}
    />
  );
};
