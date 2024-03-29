import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MovementAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { MovementsListBreadcrumb } from "../Common/Breadcrums";
import MovementFilters from "./MovementsFilters";
import { MovementListColumns } from "./movementTableColumns";
import { useMovementsListPageStore } from "./movements_list_page.store";
import { EyeOutlined } from "@ant-design/icons";

const { Content } = Layout;

export const MovementsList: React.FC = () => {
  const navigate = useNavigate();
  const { getDraftMode, getPublished } =
    useMovementsListPageStore();

  const fetchData = (params: object) => MovementAPI.getMovements(params);

  const doDelete = async (id: string | number) =>
    MovementAPI.deleteMovement(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/movements/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <MovementsListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/movements/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo movimiento
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <MovementFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="inventory-movement"
              fetchData={fetchData}
              columns={MovementListColumns}
              additionalActions={
                [
                  {
                    className: "bg-green-600 text-white hover:bg-green-50",
                    icon: <EyeOutlined className="mr-[-7px]" />,
                    onClick: (record) => {
                      navigate(`/admin/movements/manage/${record.id}`);
                    },
                    conditionEval: (_record) => {
                      return true;
                    },
                  },
                ]
              }
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
