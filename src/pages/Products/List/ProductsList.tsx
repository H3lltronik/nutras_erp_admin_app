import { EyeOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { GetProductsParams } from "../../../api/product/product.api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { ProductsListBreadcrumb } from "../Common/Breadcrums";
import { AvailableProductFilters, ProductFilters } from "./ProductFilters";
import { productListColumns } from "./productsTableColumns";
import { useProductsListPageStore } from "./products_list_page.store";

const { Content } = Layout;
type PathProps = {
  id: string;
};

type ProductsListProps = {
  defaultFilters?: GetProductsParams;
  disabledFilters?: AvailableProductFilters;
  buildNewProductPath?: (params: PathProps) => string;

  mode?: "full" | "selection-only";
  enableSelection?: boolean;
  onSelectionChange?: (selectedRows: Product[]) => void;
  selectionLimit?: number | undefined | null;
  selectedRowIds?: string[];
  productFormType?: "PP" | "PT";
  columnsToHide?: string[];
};
const isSelectionOnly = (mode: string | undefined) => mode === "selection-only";

export const ProductsList: React.FC<ProductsListProps> = (props) => {
  if (!props.mode) props.mode = "full";
  const navigate = useNavigate();
  const {
    nameSearch,
    codeSearch,
    providerSearch,
    getDraftMode,
    getDeleted,
    getPublished,
  } = useProductsListPageStore();

  const fetchData = (params: object) =>
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
        {props.mode !== "selection-only" ? (
          <div className="flex justify-between items-center">
            <ProductsListBreadcrumb />
            <Button
              onClick={handleNewProductClick}
              className="bg-green-600 text-white hover:bg-green-50"
              type="default">
              Nuevo {props.productFormType ?? "insumo"}
            </Button>
          </div>
        ) : null}
        <div className="p-[24px] bg-white">
          <ProductFilters
            disabledFilters={props.disabledFilters}
            defaultFilters={props.defaultFilters}
          />
          <section className="mx-auto">
            <AdminDataTable
              enableSelection={props.enableSelection}
              selectionLimit={
                props.selectionLimit ? props.selectionLimit : 1004
              }
              onSelectionChange={props.onSelectionChange}
              selectedRowIds={props.selectedRowIds}
              queryKey="users"
              fetchData={fetchData}
              columns={productListColumns.filter(
                (column) =>
                  !props.columnsToHide?.includes(column.dataIndex as string)
              )}
              deleteAction={doDelete}
              editAction={doEdit}
              // editDisabled={isSelectionOnly(props.mode)}
              editDisabled={(_record) => {
                const record = _record as Provider;
                return record.deletedAt != null;
              }}
              deleteDisabled={(_record) => {
                const record = _record as Provider;
                return record.deletedAt != null;
              }}
              editActionConditionEval={(record) => {
                const product = record as Product;
                return product.deletedAt === null || isSelectionOnly(props.mode);
              }}
              rowClassName={(_record) => {
                const record = _record as Product;
                if (record.deletedAt) return "cancelled-row";
                if (record.isDraft) return "draft-row";

                return "";
              }}
              perPage={20}
              additionalActions={[
                {
                  className: "bg-green-600 text-white hover:bg-green-50",
                  icon: <EyeOutlined className="mr-[-7px]" />,
                  onClick: (record) => {
                    if (isSelectionOnly(props.mode))
                      window.open(
                        `/admin/products/inspect/product/${record.id}`,
                        "_blank"
                      );
                    else
                      navigate(`/admin/products/inspect/product/${record.id}`);
                  },
                  conditionEval: (_record) => {
                    const record = _record as Product;
                    return record.isDraft === false;
                  },
                },
              ]}
              queryParameters={{
                withDeleted: "true",
                nameSearch,
                codeSearch,
                providerSearch,
                draftMode: getDraftMode(),
                published: getPublished(),
                deleted: getDeleted(),
              }}
            />
          </section>
        </div>
      </Content>
    </>
  );
};
