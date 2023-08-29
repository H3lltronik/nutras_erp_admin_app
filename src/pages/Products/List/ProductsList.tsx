import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { ProductsListBreadcrumb } from "../Common/Breadcrums";
import ProductFilters from "./ProductFilters";
import { useProductsListPageStore } from "./products_list_page.store";
import { productListColumns } from "./productsTableColumns";

const { Content } = Layout;

export const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useProductsListPageStore();

  const fetchData = (params: object) => ProductAPI.getProducts(params);

  const doDelete = async (id: string | number) =>
    ProductAPI.deleteProduct(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/products/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <ProductsListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/products/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo producto
          </Button>
        </div>
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
          }}>
          <ProductFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={productListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
              queryParameters={{ search }}
            />
          </section>
        </div>
      </Content>
    </>
  );
};
