import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const PTManageBreadcrumb = () => {
  const navigate = useNavigate();

  const productsManageBreadcrumb: ItemType[] = [
    {
      title: "Catálogo de productos",
    },
    {
      title: "Catalogo PT",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/products/pt");
      },
      href: "/admin/products/pt",
    },
    {
      title: "Crear - Editar producto PT",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={productsManageBreadcrumb} />
  );
};

export const PTListBreadcrumb = () => {
  const productsListBreadcrumb: ItemType[] = [
    {
      title: "Catálogo de productos",
    },
    {
      title: "Catalogo PT",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={productsListBreadcrumb} />
  );
};
