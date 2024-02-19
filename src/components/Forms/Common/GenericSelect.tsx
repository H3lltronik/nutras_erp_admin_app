// GenericSelect.tsx
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Select as AntSelect, Button, Modal } from "antd";
import { SelectProps as AntSelectProps } from "antd/lib/select";
import React, { useCallback, useRef, useState } from "react";

type Data<T> = {
  data: T[];
};
type ResponseWithData<T> = Data<T> | APIError;

interface GenericSelectProps<T> extends AntSelectProps<string> {
  placeholder?: string;
  multiple?: boolean;
  fetcher: () => Promise<ResponseWithData<T>>;
  queryKey: QueryKey;
  optionKey: keyof T;
  optionLabel: keyof T;
  addForm?: React.ReactNode;
  addFormTitle?: string;
  defaultValue?: string;
  fixedDefaultValue?: boolean;
}

export const GenericSelect = <T,>({
  placeholder,
  multiple,
  fetcher,
  optionKey,
  optionLabel,
  queryKey,
  addForm,
  addFormTitle,
  defaultValue,
  fixedDefaultValue,
  ...restProps
}: GenericSelectProps<T>) => {
  const fetch = useCallback(async () => {
    const response = await fetcher();

    if ("statusCode" in response) throw new Error(response.messages.join(", "));

    return response.data || [];
  }, [fetcher]);
  const addFormRef = useRef<{ getFormData: () => void }>(null);

  const { data, isLoading } = useQuery<T[]>({
    queryKey,
    queryFn: fetch,
    refetchOnWindowFocus: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex gap-1">
        <AntSelect
          className="flex-grow"
          showSearch
          defaultValue={defaultValue}
          disabled={fixedDefaultValue && defaultValue ? true : false}
          placeholder={`${placeholder}`}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
          mode={multiple ? "multiple" : undefined}
          loading={isLoading}
          {...restProps}>
          {Array.isArray(data) &&
            data.map((item: T) => (
              <AntSelect.Option
                key={String(item[optionKey])}
                value={String(item[optionKey])}>
                {String(item[optionLabel])}
              </AntSelect.Option>
            ))}
        </AntSelect>

        {addForm && !(restProps.disabled ?? false) && (
          <>
            <Button onClick={() => setIsModalOpen(true)}>+</Button>
            <Modal
              title={addFormTitle}
              open={isModalOpen}
              width={800}
              okButtonProps={{ className: "hidden" }}
              cancelButtonProps={{ className: "hidden" }}
              onCancel={() => setIsModalOpen(false)}>
              {React.cloneElement(addForm, {
                ref: addFormRef,
                onSuccess: () => setIsModalOpen(false),
              })}
            </Modal>
          </>
        )}
      </div>
    </>
  );
};
