import { useMutation, useQuery } from "@tanstack/react-query";
import { Space, Table, TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationQuery } from "../../hooks/useLocationQuery";
import { showToast } from "../../lib/notify";
import { AppLoader } from "./AppLoader";

type Action<TData> = {
  label: string;
  onClick: (record: TData) => void;
};

interface AdminDataTableProps<TData extends IDataWithID, TResponse> {
  queryKey: string;
  fetchData: (params: object) => Promise<TResponse>;
  columns: ColumnsType<TData>;
  additionalActions?: Action<TData>[];
  deleteAction: (id: string | number) => Promise<{ id: string | number }>;
  editAction: (id: string | number) => Promise<void>;
  perPage?: number;
}

interface IDataWithID {
  id: string | number;
}

export const AdminDataTable = <
  TData extends IDataWithID,
  TResponse extends { data: TData[]; pagination: Pagination },
>({
  queryKey,
  fetchData,
  columns,
  additionalActions = [],
  deleteAction,
  editAction,
  perPage = 5,
}: AdminDataTableProps<TData, TResponse>) => {
  const navigate = useNavigate();
  const locationQuery = useLocationQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const _page = locationQuery.get("page");
    const page = _page ? parseInt(_page, 10) : 1;
    setCurrentPage(page);
  }, [locationQuery]);

  const { data, isLoading, refetch } = useQuery<TResponse | APIError>(
    [queryKey, currentPage],
    () => fetchData({ offset: (currentPage - 1) * perPage, limit: perPage })
  );

  const { mutateAsync } = useMutation((id: string) => deleteAction(id), {
    onSuccess: (result) => {
      showToast(`Registro ${result.id} eliminado correctamente`, "success");
    },
    onError: (error: APIError) => {
      console.log(error);
      showToast(error?.messages[0], "error");
    },
    onSettled: () => {
      setPageLoading(false);
      refetch();
    },
  });

  const totalItems = useMemo(() => {
    if (isLoading || !data) return 0;
    if (!("pagination" in data)) return 0;

    return data.pagination.totalItems;
  }, [data, isLoading]);

  const dataSource = useMemo(() => {
    if (isLoading || !data) return [];
    if ("data" in data) return data.data;

    return [];
  }, [data, isLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    navigate(`?page=${pagination.current}`);
    setCurrentPage(pagination.current as number);
  };

  const defaultActions: Action<TData>[] = [
    {
      label: "Edit",
      onClick: async (record) => await editAction(record.id as string),
    },
    {
      label: "Delete",
      onClick: async (record) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
          setPageLoading(true);
          mutateAsync(record.id as string);
        }
      },
    },
  ];

  const combinedActions = [...defaultActions, ...additionalActions];
  const combinedColumns = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: TData) => (
        <Space size="middle">
          {combinedActions.map((action, index) => (
            <a key={index} onClick={() => action.onClick(record)}>
              <span>{action.label}</span>
            </a>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource as AnyObject[]}
        columns={combinedColumns}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          total: totalItems as number,
          pageSize: perPage,
        }}
      />
      <AppLoader isLoading={pageLoading} />
    </>
  );
};
