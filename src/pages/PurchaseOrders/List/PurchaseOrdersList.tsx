import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PurchaseOrderAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { PurchaseOrdersListBreadcrumb } from "../Common/Breadcrums";
import PurchaseOrderFilters from "./PurchaseOrdersFilters";
import { PurchaseOrderListColumns } from "./purchaseOrdersTableColumns";
import { usePurchaseOrdersListPageStore } from "./purchaseOrders_list_page.store";

const { Content } = Layout;

export const PurchaseOrdersList: React.FC = () => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } =
    usePurchaseOrdersListPageStore();

  const fetchData = (params: object) => PurchaseOrderAPI.getPurchaseOrders(params);

  const doDelete = async (id: string | number) =>
    PurchaseOrderAPI.deletePurchaseOrder(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/purchase-orders/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <PurchaseOrdersListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/purchase-orders/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nueva orden de compra
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <PurchaseOrderFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={PurchaseOrderListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
              perPage={20}
              queryParameters={{
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
