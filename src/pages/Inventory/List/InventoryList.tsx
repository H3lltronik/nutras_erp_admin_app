import { Button, Layout } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { InventoriesListBreadcrumb } from "../Common/Breadcrums";
import InventoryFilters from "./InventoryFilters";
import { useInventoriesListPageStore } from "./inventory_request_list_page.store";

const { Content } = Layout;

export const InventoriesList: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getProductsWithBatches = async () => {
      try {
        const products = await ProductAPI.getProducts();
        console.log("products", products);
      } catch (error) {
        console.error(`Error getting products`, error);
      }
    };

    getProductsWithBatches();
  }, []);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <InventoriesListBreadcrumb />

          {/* <Button
            onClick={() => navigate("/admin/work-requests/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nueva solicitud de trabajo
          </Button> */}
        </div>
        <div className="p-[24px] bg-white">
          <InventoryFilters />
          <section className="mx-auto">
            
          </section>
        </div>
      </Content>
    </>
  );
};
