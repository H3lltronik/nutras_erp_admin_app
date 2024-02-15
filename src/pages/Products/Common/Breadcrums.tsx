import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const ProductsManageBreadcrumb = () => {
  const navigate = useNavigate();

  const productsManageBreadcrumb: ItemType[] = [
    {
      title: "Catálogo de productos",
    },
    {
      title: "Catálogo de insumos",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/products/insumos");
      },
      href: "/admin/products/insumos",
    },
    {
      title: "Crear - Editar producto",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={productsManageBreadcrumb} />
  );
};

export const ProductsListBreadcrumb = () => {
  const productsListBreadcrumb: ItemType[] = [
    {
      title: "Catálogo de productos",
    },
    {
      title: "Catálogo de insumos",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={productsListBreadcrumb} />
  );
};
