import { EyeOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProvidersAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { ProvidersListBreadcrumb } from "../Common/Breadcrums";
import ProviderFilters from "./ProviderFilters";
import { providerListColumns } from "./providersTableColumns";
import { useProvidersListPageStore } from "./providers_list_page.store";

const { Content } = Layout;

export const ProvidersList: React.FC = () => {
  const navigate = useNavigate();
  const { nameSearch, codeSearch, rfcSearch, getDraftMode, getPublished } =
    useProvidersListPageStore();

  const fetchData = (params: object) => ProvidersAPI.getProviders(params);

  const doDelete = async (id: string | number) =>
    ProvidersAPI.deleteProvider(id as string);

  const doEdit = async (id: string | number) =>
    navigate(`/admin/providers/manage/${id}`);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <ProvidersListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/providers/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo proveedor
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <ProviderFilters />
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={providerListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
              editDisabled={(_record) => {
                const record = _record as Provider;
                return record.deletedAt != null;
              }}
              perPage={20}
              rowClassName={(_record) => {
                const record = _record as Product;
                if (record.deletedAt) return "cancelled-row";
                if (record.isDraft) return "draft-row";

                return "";
              }}
              queryParameters={{
                withDeleted: "true",
                nameSearch,
                codeSearch,
                rfcSearch,
                draftMode: getDraftMode(),
                published: getPublished(),
              }}
              additionalActions={[
                {
                  className: "bg-green-600 text-white hover:bg-green-50",
                  icon: <EyeOutlined className="mr-[-7px]" />,
                  onClick: (record) => {
                    navigate(`/admin/providers/inspect/provider/${record.id}`);
                  },
                  conditionEval: (_record) => {
                    const record = _record as Product;
                    return record.isDraft === false;
                  },
                },
              ]}
            />
          </section>
        </div>
      </Content>
    </>
  );
};
