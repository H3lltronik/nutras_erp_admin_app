import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { WorkOrderAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { WorkOrdersListBreadcrumb } from "../Common/Breadcrums";
import WorkOrderFilters from "./WorkOrdersFilters";
import { WorkOrderListColumns } from "./workOrderTableColumns";
import { useWorkOrdersListPageStore } from "./work_orders_list_page.store";

const { Content } = Layout;

export const WorkOrdersList: React.FC = () => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } =
    useWorkOrdersListPageStore();

  const fetchData = (params: object) => WorkOrderAPI.getWorkOrders(params);

  const doDelete = async (id: string | number) =>
    WorkOrderAPI.deleteWorkOrder(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/work-orders/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <WorkOrdersListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/work-orders/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nueva orden de trabajo
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <WorkOrderFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={WorkOrderListColumns}
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
