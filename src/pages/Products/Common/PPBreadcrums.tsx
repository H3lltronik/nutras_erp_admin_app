import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const PPManageBreadcrumb = () => {
  const navigate = useNavigate();

  const productsManageBreadcrumb: ItemType[] = [
    {
      title: "Catálogo de productos",
    },
    {
      title: "Catálogo PP",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/products/pp");
      },
      href: "/admin/products/pp",
    },
    {
      title: "Crear - Editar producto PP",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={productsManageBreadcrumb} />
  );
};

export const PPListBreadcrumb = () => {
  const productsListBreadcrumb: ItemType[] = [
    {
      title: "Catálogo de productos",
    },
    {
      title: "Catálogo PP",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={productsListBreadcrumb} />
  );
};
