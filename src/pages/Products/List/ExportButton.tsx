import { Button } from "antd";
import { useCallback } from "react";
import { AdminDataTableHandle } from "../../../components/Common/AdminDataTable";

type ExportButtonProps = {
  adminTableRef: React.RefObject<AdminDataTableHandle>;
  exportPath: string;
  queryParams?: Record<string, string | number | undefined>;
};

export const ExportButton: React.FC<ExportButtonProps> = (props) => {
  const handleExportClick = useCallback(() => {
    const currentParams = {
      ...props.queryParams,
      ...props.adminTableRef.current?.getRequestParams(),
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(
        currentParams as Record<string, string | number | undefined>
      )
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, value as string])
    );

    const params = new URLSearchParams(cleanedParams as Record<string, string>);
    window.open(`${props.exportPath}?${params.toString()}`);
  }, [props.adminTableRef, props.exportPath, props.queryParams]);

  return (
    <Button
      onClick={handleExportClick}
      className="bg-green-600 text-white hover:bg-green-50"
      type="default">
      Exportar
    </Button>
  );
};
