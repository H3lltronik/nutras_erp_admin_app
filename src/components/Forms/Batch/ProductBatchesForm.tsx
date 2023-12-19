import { Col, Form, Input, Row } from "antd";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../../pages/Products";
import { FormList, FormListHandle } from "../Common/FormList";
import BatchForm, { BatchFormHandle } from "./BatchForm";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
  user: any;
}

export type ProductBatchesFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Batch>;
};

type ProductBatchesFormProps = {
  entity?: Batch | null;
  disableProductSelection?: boolean;
};

const ProductBatchesForm = forwardRef<
  ProductBatchesFormHandle,
  ProductBatchesFormProps
>((_props, ref) => {
  const [form] = Form.useForm();
  const formListRef = useRef<FormListHandle>(null);
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useImperativeHandle(
    ref,
    (): ProductBatchesFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);
        const lotesData = await formListRef.current?.getAllFormsData();
        console.log("[Batches] lotesData", {
          ...form.getFieldsValue(),
          lotes: lotesData,
          selectedProduct,
        });

        const valid = await form.validateFields();
        return {
          ...form.getFieldsValue(),
          lotes: lotesData,
          selectedProduct,
        };
      },
    })
  );

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);
  }, [form, _props.entity]);

  const onSelectionChange = (selectedRows: Product[]) => {
    if (selectedRows.length > 0) setSelectedProduct(selectedRows[0]);
  };

  return (
    <Form
      form={form}
      name="ProductBatchesForm"
      initialValues={{ remember: true, userId: useAuth().user?.id }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<Batch> name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      <Row gutter={16} className="mb-5">
        {selectedProduct && (
          <Col span={24}>
            <span className="text-xl">Seleccionado: </span>
            <span className="font-bold text-xl">
              {selectedProduct.commonName}
            </span>
          </Col>
        )}
        <Col span={24}>
          <ProductsList
            mode="selection-only"
            enableSelection={true}
            selectionLimit={1}
            onSelectionChange={onSelectionChange}
            defaultFilters={{
              published: true,
            }}
            disabledFilters={{
              status: true,
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} className="px-10 bg-gray-300">
        <FormList
          title="Agregar lote"
          itemClassName="bg-gray-100 shadow-md"
          ref={formListRef}
          renderForm={(ref: Ref<BatchFormHandle>) => <BatchForm ref={ref} />}
          getFormData={(formHandle: BatchFormHandle) =>
            formHandle.getFormData()
          }
        />
      </Row>
    </Form>
  );
});

export default ProductBatchesForm;
