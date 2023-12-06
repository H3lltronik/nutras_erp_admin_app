import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const BatchesManageBreadcrumb = () => {
  const navigate = useNavigate();

  const batchesManageBreadcrumb: ItemType[] = [
    {
      title: "Almacén",
    },
    {
      title: "Lotes",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/lotes");
      },
      href: "/admin/lotes",
    },
    {
      title: "Crear - Editar lote",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={batchesManageBreadcrumb} />
  );
};

export const BatchesListBreadcrumb = () => {
  const batchesListBreadcrumb: ItemType[] = [
    {
      title: "Almacén",
    },
    {
      title: "Lotes",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={batchesListBreadcrumb} />
  );
};
