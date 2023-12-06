import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BatchAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { BatchesListBreadcrumb } from "../Common/Breadcrums";
import BatchFilters from "./BatchesFilters";
import { BatchListColumns } from "./batchTableColumns";
import { useBatchesListPageStore } from "./batches_list_page.store";

const { Content } = Layout;

export const BatchesList: React.FC = () => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } =
    useBatchesListPageStore();

  const fetchData = (params: object) => BatchAPI.getBatches(params);

  const doDelete = async (id: string | number) =>
    BatchAPI.deleteBatch(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/lotes/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <BatchesListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/lotes/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo lote
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <BatchFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={BatchListColumns}
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
