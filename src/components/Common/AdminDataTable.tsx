import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Space, Table, TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocationQuery } from "../../hooks/useLocationQuery";
import { showToast } from "../../lib/notify";
const { confirm } = Modal;

export type Action<TData> = {
  label?: string;
  onClick: (record: TData) => void;
  icon?: React.ReactNode;
  className?: string;
  conditionEval?: (record: TData) => boolean;
};

interface AdminDataTableProps<TData extends IDataWithID, TResponse> {
  queryKey: string;
  fetchData: (params: object) => Promise<TResponse | APIError>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnsType<any>;
  additionalActions?: Action<TData>[];
  deleteAction: (
    id: string | number
  ) => Promise<{ id: string | number } | APIError>;
  editAction: (id: string | number) => Promise<void>;
  perPage?: number;
  rowClassName?: (record: TData, index: number) => string;
  queryParameters?: Record<string, string | number | undefined>;
  deleteActionConditionEval?: (record: TData) => boolean;
  editActionConditionEval?: (record: TData) => boolean;
  deleteDisabled?: boolean | ((record: TData) => boolean);
  editDisabled?: boolean | ((record: TData) => boolean);
  enableSelection?: boolean;
  selectionLimit?: number;
  onSelectionChange?: (selectedRows: TData[]) => void;
  selectedRowIds?: string[];
}

export interface IDataWithID {
  id: string | number;
}

export type AdminDataTableHandle = {
  getRequestParams: () => Record<string, string | number | undefined>;
};

const _AdminDataTable = <
  TData extends IDataWithID,
  TResponse extends { data: TData[]; pagination: Pagination },
>(
  props: AdminDataTableProps<TData, TResponse>,
  ref: React.Ref<AdminDataTableHandle>
) => {
  const {
    enableSelection = false,
    selectionLimit = 1,
    onSelectionChange = () => {},
    queryKey,
    fetchData,
    columns,
    additionalActions = [],
    deleteAction,
    deleteActionConditionEval,
    editAction,
    editActionConditionEval,
    queryParameters = {},
    rowClassName,
    editDisabled = false,
    deleteDisabled = false,
    perPage = 5,
    selectedRowIds = [],
  } = props;
  const navigate = useNavigate();
  const locationQuery = useLocationQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);

  useImperativeHandle(ref, () => ({
    getRequestParams: () => getRequestParams(),
  }));

  // implement a way to let the table know what rows is selected by default
  useEffect(() => {
    if (selectedRowIds.length === 0) return;

    const newSelectedRows = selectedRowIds.map((id) => ({ id }) as TData);
    const merged = [...selectedRows, ...newSelectedRows];
    const uniqueRows = Array.from(new Set(merged.map((row) => row.id))).map(
      (id) => merged.find((row) => row.id === id)
    );

    setSelectedRows(uniqueRows as TData[]);
  }, [selectedRowIds]);

  useEffect(() => {
    const _page = locationQuery.get("page");
    const page = _page ? parseInt(_page, 10) : 1;
    setCurrentPage(page);
  }, [locationQuery]);

  const { data, isLoading, isFetching, refetch } = useQuery<
    TResponse | APIError
  >({
    queryKey: [queryKey, currentPage],
    queryFn: () =>
      fetchData({
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        ...queryParameters,
      }),
  });

  const getRequestParams = () => {
    return {
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      ...queryParameters,
    };
  };

  const loading = useMemo(
    () => pageLoading || isFetching,
    [pageLoading, isFetching]
  );

  useEffect(() => {
    if (Object.keys(queryParameters).length === 0) return;
    refetch();
  }, [refetch, queryParameters]);

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteAction(id),
    onSuccess: (result) => {
      if ("id" in result)
        showToast(`Registro ${result.id} eliminado correctamente`, "success");
      else showToast("Ha ocurrido un error al eliminar el registro", "error");
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

  const rowSelectionConfig = useMemo(() => {
    if (enableSelection === false) return undefined;

    const config: TableRowSelection<TData> = {
      type: selectionLimit > 1 ? "checkbox" : "radio",
      selectedRowKeys: selectedRows.map((row) => row.id),
      onChange: (
        selectedRowKeys: (string | number)[],
        selectedRows: TData[]
      ) => {
        if (selectedRowKeys.length > selectionLimit) return;
        setSelectedRows(selectedRows);
        onSelectionChange(selectedRows);
      },
      hideSelectAll: true,
    };

    return config;
  }, [enableSelection, onSelectionChange, selectedRows, selectionLimit]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    navigate(`?page=${pagination.current}`);
    setCurrentPage(pagination.current as number);
  };

  const buildDefaultActions = (record: TData) => {
    const defaultActions: Action<TData>[] = [];

    let _editDisabled = editDisabled;
    if (typeof editDisabled === "function") {
      _editDisabled = editDisabled(record);
    }

    if (editAction != null && !_editDisabled)
      defaultActions.push({
        icon: <EditOutlined className="mr-[-6px]" />,
        className: "bg-blue-600 text-white hover:bg-blue-50",
        onClick: async (record) => await editAction(record.id as string),
        conditionEval: editActionConditionEval,
      });

    let _deleteDisabled = deleteDisabled;
    if (typeof deleteDisabled === "function") {
      _deleteDisabled = deleteDisabled(record);
    }

    if (deleteAction != null && !_deleteDisabled)
      defaultActions.push({
        icon: <CloseOutlined className="mr-[-7px]" />,
        className: "bg-red-600 text-white hover:bg-red-50",
        onClick: async (record) => {
          confirm({
            icon: <ExclamationCircleOutlined />,
            content: <p className="">¿Estás seguro de cancelar el registro?</p>,
            onOk: () => {
              setPageLoading(true);
              mutateAsync(record.id as string);
            },
            okButtonProps: {
              className: "bg-red-500 border-none hover:bg-red-600",
            },
          });
        },
        conditionEval: deleteActionConditionEval,
      });

    return defaultActions;
  };

  const buidCombinedActions = (record: TData) => [
    ...buildDefaultActions(record),
    ...additionalActions,
  ];
  const combinedColumns = [
    ...columns,
    {
      title: "Acción",
      key: "action",
      render: (_: unknown, record: TData) => (
        <Space size="small">
          {buidCombinedActions(record)
            .filter((item) => {
              if (!item.conditionEval) return true;
              return item.conditionEval(record);
            })
            .map((action, index) => (
              <Button
                className={`flex items-center justify-center ${action.className}`}
                key={index}
                onClick={() => action.onClick(record)}
                size="small"
                icon={action.icon}>
                <span>{action.label}</span>
              </Button>
            ))}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        className="table-striped-rows"
        dataSource={dataSource as AnyObject[]}
        columns={combinedColumns as unknown as ColumnsType<TData>}
        onChange={handleTableChange}
        rowKey={"id"}
        pagination={{
          current: currentPage,
          total: totalItems as number,
          pageSize: perPage,
        }}
        // implement a way to let the table know what rows is selected
        rowClassName={rowClassName}
        rowSelection={rowSelectionConfig}
      />
    </>
  );
};

export const AdminDataTable = forwardRef(_AdminDataTable);
