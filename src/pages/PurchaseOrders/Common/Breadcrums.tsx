import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const PurchaseOrdersManageBreadcrumb = () => {
  const navigate = useNavigate();

  const purchaseOrdersManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Ordenes de compra",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/purchase-orders");
      },
      href: "/admin/purchase-orders",
    },
    {
      title: "Crear - Editar orden de compra",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={purchaseOrdersManageBreadcrumb} />
  );
};

export const PurchaseOrdersListBreadcrumb = () => {
  const purchaseOrdersListBreadcrumb: ItemType[] = [
    {
      title: "Compras",
    },
    {
      title: "Ordenes de compra",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={purchaseOrdersListBreadcrumb} />
  );
};
