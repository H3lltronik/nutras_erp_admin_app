import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { GetProductsParams } from "../../../api/product/product.api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { ProductsListBreadcrumb } from "../Common/Breadcrums";
import ProductFilters from "./ProductFilters";
import { productListColumns } from "./productsTableColumns";
import { useProductsListPageStore } from "./products_list_page.store";

const { Content } = Layout;
type PathProps = {
  id: string;
};

type ProductsListProps = {
  defaultFilters?: GetProductsParams;
  buildNewProductPath?: (params: PathProps) => string;
};
export const ProductsList: React.FC<ProductsListProps> = (props) => {
  const navigate = useNavigate();
  const { nameSearch, codeSearch, providerSearch, getDraftMode, getPublished } =
    useProductsListPageStore();

  const fetchData = (params: PathProps) =>
    ProductAPI.getProducts({
      ...params,
      ...props.defaultFilters,
    } as GetProductsParams);

  const doDelete = async (id: string | number) =>
    ProductAPI.deleteProduct(id as string);

  const doEdit = async (id: string | number) => {
    let url = `/admin/products/manage/${id}`;
    if (props.buildNewProductPath) {
      url = props.buildNewProductPath({ id: id + "" });
    }
    console.log("url", url);
    navigate(url);
  };

  const handleNewProductClick = () => {
    let url = "/admin/products/manage";
    if (props.buildNewProductPath) {
      url = props.buildNewProductPath({ id: "" });
    }
    navigate(url);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <ProductsListBreadcrumb />

          <Button
            onClick={handleNewProductClick}
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
