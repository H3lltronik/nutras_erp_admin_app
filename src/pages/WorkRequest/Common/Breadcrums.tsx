import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const WorkRequestsManageBreadcrumb = () => {
  const navigate = useNavigate();

  const workRequestsManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Solicitudes de trabajo",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/work-requests");
      },
      href: "/admin/work-requests",
    },
    {
      title: "Crear - Editar solicitud de trabajo",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={workRequestsManageBreadcrumb} />
  );
};

export const WorkRequestsListBreadcrumb = () => {
  const workRequestsListBreadcrumb: ItemType[] = [
    {
      title: "Producción",
    },
    {
      title: "Solicitudes de trabajo",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={workRequestsListBreadcrumb} />
  );
};
