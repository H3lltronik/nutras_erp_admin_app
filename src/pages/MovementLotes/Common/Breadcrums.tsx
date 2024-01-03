import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const MovementLotesManageBreadcrumb = () => {
  const navigate = useNavigate();

  const movementsManageBreadcrumb: ItemType[] = [
    {
      title: "Almacén",
    },
    {
      title: "Movimientos",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/movements");
      },
      href: "/admin/movements",
    },
    {
      title: "Crear movimiento",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={movementsManageBreadcrumb} />
  );
};

export const MovementLotesListBreadcrumb = () => {
  const movementsListBreadcrumb: ItemType[] = [
    {
      title: "Almacén",
    },
    {
      title: "Movimientos",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={movementsListBreadcrumb} />
  );
};
