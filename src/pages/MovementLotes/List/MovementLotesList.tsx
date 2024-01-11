import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MovementLotesAPI } from "../../../api";
import { GetMovementLotesParams } from "../../../api/movement_lotes/movement_lotes.api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { MovementLotesListBreadcrumb } from "../Common/Breadcrums";
import MovementFilters from "./MovementLotesFilters";
import { MovementLotesListColumns } from "./movementTableColumns";
import { useMovementLotesListPageStore } from "./movement_lotes_list_page.store";

const { Content } = Layout;
type MovementLotesListProps = {
  defaultFilters?: GetMovementLotesParams;

  mode?: "full" | "selection-only";
  enableSelection?: boolean;
  onSelectionChange?: (selectedRows: MovementLotes[]) => void;
  selectionLimit?: number | undefined | null;
  perPage?: number;
};
export const MovementLotesList: React.FC<MovementLotesListProps> = (props) => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } = useMovementLotesListPageStore();

  const fetchData = (params: object) =>
    MovementLotesAPI.getMovementLotes(params);

  const doDelete = async (id: string | number) =>
    console.error("Not implemented yet");

  const doEdit = async (id: string | number) =>
    navigate(`/admin/movementLotes/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <MovementLotesListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/movementLotes/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo movimiento
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <MovementFilters />
          <section className="mx-auto">
            <AdminDataTable
              enableSelection={props.enableSelection}
              selectionLimit={props.selectionLimit ? props.selectionLimit : 100}
              onSelectionChange={props.onSelectionChange}
              queryKey="inventory-movement-lotes"
              fetchData={fetchData}
              columns={MovementLotesListColumns}
              deleteAction={doDelete}
              deleteDisabled={true}
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
