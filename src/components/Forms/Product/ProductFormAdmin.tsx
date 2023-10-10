import { Col, Form, Input, Row, Switch } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { MeasurementAPI, ProductTypesAPI, ProvidersAPI } from "../../../api";
import { ProductFormResult } from "../../../pages/Products/lib/formatProductForm";
import { ProvidersManage } from "../../../pages/Providers";
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
};

const ProductFormAdmin = forwardRef<ProductFormHandle, ProductFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const productKosherFormRef = useRef<ProductKosherFormHandle | null>(null);
    const isKosher = Form.useWatch("isKosher", form);

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
            isDraft: !!params?.draftMode,
            isPublished: !params?.draftMode,
          };
        },
      })
    );

    useEffect(() => {
      if (_props.entity) form.setFieldsValue(_props.entity);
    }, [form, _props.entity]);

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
            <GenericSelect
              fetcher={() => ProductTypesAPI.getProductTypes()}
              label="Tipo de producto"
              placeholder="Selecciona un tipo de producto"
              optionLabel="name"
              name="productTypeId"
              optionKey={"id"}
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}
              queryKey={["productTypes"]}
            />
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
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Codigo"
              name="commonName"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <GenericSelect
              fetcher={() => MeasurementAPI.getMeasurements()}
              label="Unidad de medida"
              placeholder="Selecciona una unidad de medida"
              optionLabel="name"
              name="unitId"
              optionKey={"id"}
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}
              queryKey={["measurements"]}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Descripción del producto"
              name="commonName"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
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
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Product>
              label="Empaque"
              name="mold"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
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
              <Input />
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
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Product>
              label="Molde"
              name="quantityPerUnit"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <GenericSelect
              fetcher={() => ProvidersAPI.getProviders()}
              label="Proveedor"
              placeholder="Selecciona un proveedor"
              optionLabel="name"
              name="providerId"
              optionKey={"id"}
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}
              queryKey={["providers"]}
              addForm={<ProvidersManage enableRedirect={false} />}
              addFormTitle="Agregar Proveedor"
            />
          </Col>
          <Col span={"auto"}>
            <Form.Item<Product> label="Kosher" name="isKosher">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={"auto"}>
            <Form.Item<Product> label="Alergeno" name="allergen">
              <Switch />
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

export default ProductFormAdmin;
