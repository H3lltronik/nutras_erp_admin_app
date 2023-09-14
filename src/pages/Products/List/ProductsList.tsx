import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { ProductsListBreadcrumb } from "../Common/Breadcrums";
import ProductFilters from "./ProductFilters";
import { productListColumns } from "./productsTableColumns";
import { useProductsListPageStore } from "./products_list_page.store";

const { Content } = Layout;

export const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const { nameSearch, codeSearch, providerSearch, getDraftMode, getPublished } =
    useProductsListPageStore();

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
        <div className="p-[24px] bg-white">
          <ProductFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={productListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
              perPage={20}
              queryParameters={{
                nameSearch,
                codeSearch,
                providerSearch,
                draftMode: getDraftMode(),
                published: getPublished(),
              }}
            />
          </section>
        </div>
      </Content>
    </>
  );
};
