import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PurchaseRequisitionAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { PurchaseRequisitionManageBreadcrumb } from "../Common/Breadcrums";
import PurchaseRequisitionFilters from "./PurchaseRequisitionFilters";
import { PurchaseRequisitionListColumns } from "./purchaseRequisitionTableColumns";
import { usePurchaseRequisitionListPageStore } from "./purchase_requisition_list_page.store";

const { Content } = Layout;

export const PurchaseRequisitionList: React.FC = () => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } = usePurchaseRequisitionListPageStore();

  const fetchData = (params: object) =>
    PurchaseRequisitionAPI.getPurchaseRequisitions(params);

  const doDelete = async (id: string | number) =>
    PurchaseRequisitionAPI.deletePurchaseRequisition(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/purchase-requisition/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <PurchaseRequisitionManageBreadcrumb />

          <Button
            onClick={() => navigate("/admin/purchase-requisition/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nueva orden de trabajo
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <PurchaseRequisitionFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={PurchaseRequisitionListColumns}
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
