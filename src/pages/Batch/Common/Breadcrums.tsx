import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const BatchesManageBreadcrumb = () => {
  const navigate = useNavigate();

  const batchesManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Lotes",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/batches");
      },
      href: "/admin/batches",
    },
    {
      title: "Crear - Editar producto",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={batchesManageBreadcrumb} />
  );
};

export const BatchesListBreadcrumb = () => {
  const batchesListBreadcrumb: ItemType[] = [
    {
      title: "Administración",
    },
    {
      title: "Lotes",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={batchesListBreadcrumb} />
  );
};
