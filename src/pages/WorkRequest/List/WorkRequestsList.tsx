import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { WorkRequestAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { WorkRequestsListBreadcrumb } from "../Common/Breadcrums";
import WorkRequestFilters from "./WorkRequestsFilters";
import { WorkRequestListColumns } from "./workRequestTableColumns";
import { useWorkRequestsListPageStore } from "./work_requests_list_page.store";

const { Content } = Layout;

export const WorkRequestsList: React.FC = () => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } =
    useWorkRequestsListPageStore();

  const fetchData = (params: object) => WorkRequestAPI.getWorkRequests(params);

  const doDelete = async (id: string | number) =>
    WorkRequestAPI.deleteWorkRequest(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/work-requests/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <WorkRequestsListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/work-requests/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nueva solicitud de trabajo
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <WorkRequestFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={WorkRequestListColumns}
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
