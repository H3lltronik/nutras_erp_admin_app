// GenericSelect.tsx
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Select as AntSelect, Button, Form, Modal } from "antd";
import { SelectProps as AntSelectProps } from "antd/lib/select";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Data<T> = {
  data: T[];
};
type ResponseWithData<T> = Data<T> | APIError;

interface GenericSelectProps<T> extends AntSelectProps<string> {
  label: string;
  placeholder?: string;
  name: string;
  fetcher: () => Promise<ResponseWithData<T>>;
  queryKey: QueryKey;
  optionKey: keyof T;
  optionLabel: keyof T;
  rules?: object[];
  addForm?: React.ReactNode;
  addFormTitle?: string;
}

export const GenericSelect = <T,>({
  label,
  placeholder,
  name,
  fetcher,
  optionKey,
  optionLabel,
  rules,
  queryKey,
  addForm,
  addFormTitle,
  ...restProps
}: GenericSelectProps<T>) => {
  const fetch = useCallback(async () => {
    const response = await fetcher();

    if ("statusCode" in response) throw new Error(response.messages.join(", "));

    return response.data || [];
  }, [fetcher]);
  const addFormRef = useRef<{ getFormData: () => void }>(null);

  const { data, isLoading } = useQuery<T[]>(queryKey, () => fetch(), {
    refetchOnWindowFocus: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("data GENERIC", data);
  }, [data]);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <div className="flex gap-1">
        <AntSelect
          showSearch
          placeholder={`${placeholder}`}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
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

        {addForm && (
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
    </Form.Item>
  );
};
