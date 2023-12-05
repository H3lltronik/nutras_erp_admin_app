import { EyeOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BatchAPI } from "../../../api";
import { GetBatchesParams } from "../../../api/batch/batch.api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { BatchesListBreadcrumb } from "../Common/Breadcrums";
import BatchFilters from "./BatchesFilters";
import { batchListColumns } from "./batchesTableColumns";
import { useBatchesListPageStore } from "./batches_list_page.store";

const { Content } = Layout;
type PathProps = {
  id: string;
};

type BatchesListProps = {
  defaultFilters?: GetBatchesParams;
  buildNewBatchPath?: (params: PathProps) => string;
};
export const BatchesList: React.FC<BatchesListProps> = (props) => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } = useBatchesListPageStore();

  const fetchData = (params: object) =>
    BatchAPI.getBatches({
      ...params,
      ...props.defaultFilters,
    } as GetBatchesParams);

  const doDelete = async (id: string | number) =>
    BatchAPI.deleteBatch(id as string);

  const doEdit = async (id: string | number) => {
    let url = `/admin/lote/manage/${id}`;
    if (props.buildNewBatchPath) {
      url = props.buildNewBatchPath({ id: id + "" });
    }
    console.log("url", url);
    navigate(url);
  };

  const handleNewBatchClick = () => {
    let url = "/admin/lote/manage";
    if (props.buildNewBatchPath) {
      url = props.buildNewBatchPath({ id: "" });
    }
    navigate(url);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <BatchesListBreadcrumb />

          <Button
            onClick={handleNewBatchClick}
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
              columns={batchListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
              editActionConditionEval={(record) => {
                const batch = record as Batch;
                return batch.deletedAt === null;
              }}
              rowClassName={(_record) => {
                const record = _record as Batch;
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
                    navigate(`/admin/lote/inspect/batch/${record.id}`);
                  },
                  conditionEval: (_record) => {
                    const record = _record as Batch;
                    return record.isDraft === false;
                  },
                },
              ]}
              queryParameters={{
                withDeleted: "true",
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
