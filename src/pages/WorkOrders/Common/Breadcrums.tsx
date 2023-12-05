import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const WorkOrdersManageBreadcrumb = () => {
  const navigate = useNavigate();

  const workOrdersManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Ordenes de trabajo",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/work-orders");
      },
      href: "/admin/work-orders",
    },
    {
      title: "Crear - Editar orden de trabajo",
    },
  ];
  return (
    <Breadcrumb
      style={{ margin: "16px 0" }}
      items={workOrdersManageBreadcrumb}
    />
  );
};

export const WorkOrdersListBreadcrumb = () => {
  const workOrdersListBreadcrumb: ItemType[] = [
    {
      title: "Producción",
    },
    {
      title: "Ordenes de trabajo",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={workOrdersListBreadcrumb} />
  );
};
