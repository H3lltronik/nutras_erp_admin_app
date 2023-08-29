import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductAPI } from "../../api";
import { AdminDataTable } from "../../components/Common/AdminDataTable";
import { ProductsListBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const columns = [
    {
      title: "Partida ID",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const fetchData = (params: object) => ProductAPI.getProducts(params);

  const doDelete = async (id: string | number) => {
    return ProductAPI.deleteProduct(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`/admin/products/manage/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <ProductsListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/products/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo producto
          </Button>
        </div>
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
          }}>
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={columns}
              deleteAction={doDelete}
              editAction={doEdit}
            />
          </section>
        </div>
      </Content>
    </>
  );
};
