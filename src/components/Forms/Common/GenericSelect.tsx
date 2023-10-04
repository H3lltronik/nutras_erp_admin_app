// GenericSelect.tsx
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Select as AntSelect, Form } from "antd";
import { SelectProps as AntSelectProps } from "antd/lib/select";
import { useCallback, useEffect, useState } from "react";

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
  ...restProps
}: GenericSelectProps<T>) => {
  const fetch = useCallback(async () => {
    const response = await fetcher();

    if ("statusCode" in response) throw new Error(response.messages.join(", "));

    return response.data || [];
  }, [fetcher]);

  const { data, isLoading } = useQuery<T[]>(queryKey, () => fetch(), {
    refetchOnWindowFocus: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("data GENERIC", data);
  }, [data]);

  return (
    <Form.Item label={label} name={name} rules={rules}>
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

      {/* <Button onClick={() => setIsModalOpen(true)}>+</Button>
      <Modal title="Basic Modal" open={isModalOpen} >
        <UsersManage />
      </Modal> */}
    </Form.Item>
  );
};
