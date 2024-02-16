import qs from "qs";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type DataType = "string" | "boolean" | "stringArray" | "number";
type SyncParam = {
  key: string;
  value: any;
  updater: (value: any) => void;
  dataType: DataType;
};

const isValueEmpty = (value: any): boolean => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0)
  );
};

const useSyncSearchParams = (params: SyncParam[]) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstRender = useRef(true);

  const serializedState = qs.stringify(
    params.reduce(
      (acc, { key, value, dataType }) => {
        if (!isValueEmpty(value)) {
          acc[key] =
            dataType === "stringArray" ? (value as string[]).join(",") : value;
        }
        return acc;
      },
      {} as Record<string, any>
    ),
    { skipNulls: true, encode: false }
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentParams = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (serializedState !== qs.stringify(currentParams, { encode: false })) {
      navigate(`${location.pathname}?${serializedState}`, { replace: true });
    }
  }, [navigate, location, serializedState]);

  useEffect(() => {
    const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    params.forEach(({ key, updater, dataType }) => {
      const value = queryParams[key];
      if (!isValueEmpty(value)) {
        updater(
          dataType === "boolean"
            ? value === "true"
            : dataType === "stringArray"
            ? value.split(",")
            : dataType === "number"
            ? parseFloat(value as string)
            : value
        );
      }
    });
  }, []);
};

export default useSyncSearchParams;
