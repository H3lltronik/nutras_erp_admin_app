import { Col, Form, Input, Row } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { MeasurementAPI, ProductTypesAPI } from "../../../api";
import { urlWithGetKeyToJson } from "../../../lib/entity.utils";
import { useFormModeChecker } from "../../../lib/form/disabledChecked";
import { ProductFormResult } from "../../../pages/Products/lib/formatProductForm";
import { GenericSelect } from "../Common/GenericSelect";
import ProductKosherForm, {
  ProductKosherFormHandle,
} from "./ProductKosherForm";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type ProductFormHandle = {
  getFormData: (params?: GetFormData) => Promise<ProductFormResult>;
};

type ProductFormProps = {
  entity?: Product | null;
  formMode?: FormMode;
};

const ProductFormProduccion = forwardRef<ProductFormHandle, ProductFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const productKosherFormRef = useRef<ProductKosherFormHandle | null>(null);
    const isKosher = Form.useWatch("isKosher", form);
    const { disabled } = useFormModeChecker({ formMode: _props.formMode });

    useImperativeHandle(
      ref,
      (): ProductFormHandle => ({
        getFormData: async (params) => {
          setIsDraft(!!params?.draftMode);
          const valid = await form.validateFields();

          const kosherDetails = await productKosherFormRef.current?.getFormData(
            params
          );

          return {
            ...form.getFieldsValue(),
            ...kosherDetails,
            departmentId: "3ed0a95c-6eed-4928-8ab6-9c5f888bc029",
            isDraft: !!params?.draftMode,
            isPublished: !params?.draftMode,
          };
        },
      })
    );

    const defaultValuesFromUrl = useMemo(() => {
      return urlWithGetKeyToJson(
        location.search,
        "defaultValues"
      ) as Product | null;
    }, [location]);

    useEffect(() => {
      if (_props.entity) form.setFieldsValue(_props.entity);

      if (defaultValuesFromUrl) form.setFieldsValue(defaultValuesFromUrl);
    }, [form, _props.entity, defaultValuesFromUrl]);

    return (
      <Form
        form={form}
        name="productForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Product> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Tipo de producto"
              name="productTypeId"
              rules={[
                {
                  required: true,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <GenericSelect
                disabled={disabled}
                fetcher={() =>
                  ProductTypesAPI.getProductTypes({
                    department: import.meta.env
                      .VITE_DBVAL_DEPARTMENT_PRODUCTION_ID,
                  })
                }
                placeholder="Selecciona un tipo de producto"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["productTypes"]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Product>
              label="Nombre Común"
              name="commonName"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Codigo"
              name="code"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Product>
              label="Unidad de medida"
              name="unitId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <GenericSelect
                disabled={disabled}
                fetcher={() => MeasurementAPI.getMeasurements()}
                placeholder="Selecciona una unidad de medida"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["measurements"]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Descripción del producto"
              name="description"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Product>
              label="Presentacion"
              name="presentation"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Empaque"
              name="packaging"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Product>
              label="Cantidad x unidad"
              name="quantityPerUnit"
              rules={[
                {
                  required: false && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Presentación PT"
              name="presentation"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Product>
              label="Molde"
              name="mold"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>

        {isKosher && (
          <Row
            gutter={16}
            className="bg-gray-100 p-5 shadow-md rounded-md mb-5">
            <Col span={24}>
              <ProductKosherForm ref={productKosherFormRef} />
            </Col>
          </Row>
        )}
      </Form>
    );
  }
);

export default ProductFormProduccion;
