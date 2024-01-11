import { Button, Collapse, Layout, Table } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { InventoriesListBreadcrumb } from "../Common/Breadcrums";
import InventoryFilters from "./InventoryFilters";
import { useInventoriesListPageStore } from "./inventory_request_list_page.store";
import { ProductFilters } from "../../Products/List/ProductFilters";
import { useProductsListPageStore } from "../../Products/List/products_list_page.store";
import moment from "moment-timezone";
import { alphabetically } from "../../../lib/sorters";

const { Content } = Layout;

export const InventoriesList: React.FC = () => {
  const navigate = useNavigate();
  const { nameSearch, codeSearch, providerSearch, getDraftMode, getPublished } = useProductsListPageStore();
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const getProductsWithBatches = async () => {
      console.log("searching by name: ", nameSearch);
      try {
        const products = await ProductAPI.getProductsWithBatches({
          nameSearch,
          codeSearch,
          providerSearch,
        });
        const productsArray = products.data ? products.data : [];
        setProducts(productsArray.map((product) => ({ ...product, key: product.id })));
        console.log("products", products);
      } catch (error) {
        console.error(`Error getting products`, error);
      }
    };

    getProductsWithBatches();
  }, [nameSearch, codeSearch, providerSearch, getDraftMode, getPublished]);

  const columns = [
    {
      title: "ID",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
      sorter: (a, b) => a.partidaId - b.partidaId,
      showSorterTooltip: false,
    },
    {
      title: "Codigo",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => (a.code && b.code ? alphabetically(a.code, b.code) : 0),
      showSorterTooltip: false,
    },
    {
      title: "Nombre",
      dataIndex: "commonName",
      key: "commonName",
      sorter: (a, b) => (a.commonName && b.commonName ? alphabetically(a.commonName, b.commonName) : 0),
      showSorterTooltip: false,
    },
    {
      title: "Proveedor",
      dataIndex: "provider",
      key: "provider",
      render(_value, record) {
        return record.provider?.name;
      },
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render(_value, record) {
        return record?.lotes.reduce((acc, batch) => acc + batch.quantity, 0);
      },
      showSorterTooltip: false,
    },
    {
      title: "Unidad",
      dataIndex: "unit",
      key: "unit",
      render(_value, record) {
        return record.unit?.name;
      },
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <InventoriesListBreadcrumb />

          <Button
            className="bg-blue-600 text-white hover:bg-blue-50"
            type="default">
            Generar reporte de inventario
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <div className="flex">
            <ProductFilters />
          </div>
          <section className="mx-auto">
            <Table
              dataSource={products}
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <>
                    <div className="font-semibold" style={{fontSize: "1.2rem"}}>
                      Lotes de {record.commonName}
                    </div>
                    <Table
                      className="w-full"
                      style={{ marginLeft: "0px" }}
                      dataSource={record.lotes.map((batch) => {
                        return {
                          ...batch,
                          key: batch.id,
                        };
                      })}
                      columns={[
                        {
                          title: "Código",
                          dataIndex: "code",
                          key: "code",
                        },
                        {
                          title: "Caducidad",
                          dataIndex: "expirationDate",
                          key: "expirationDate",
                          render(value) {
                            return value ? moment(value).format("DD/MM/YYYY") : "Sin caducidad";
                          }
                        },
                        {
                          title: "Fecha de entrada",
                          dataIndex: "createdAt",
                          key: "createdAt",
                          render(value) {
                            return value ? moment(value).format("DD/MM/YYYY") : "Sin caducidad";
                          }
                        },
                        {
                          title: "Cantidad",
                          dataIndex: "quantity",
                          key: "quantity",
                        },
                        {
                          title: "Unidad de medida",
                          dataIndex: "expirationDate",
                          key: "expirationDate",
                          render(value) {
                            return record.unit?.name;
                          }
                        },
                      ]}
                    >
                    </Table>
                  </>
                ),
              }}
            />
          </section>
        </div>
      </Content>
    </>
  );
};
