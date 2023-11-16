import { Col, Form, Input, Row, Switch } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { MeasurementAPI, ProductTypesAPI, ProvidersAPI } from "../../../api";
import { urlWithGetKeyToJson } from "../../../lib/entity.utils";
import {
  ProductFormResult,
  ProductToPost,
  ProductionDataToPost,
  PurchaseDataToPost,
} from "../../../pages/Products/lib/formatProductForm";
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
    const isAllergen = Form.useWatch("allergen", form);
    const location = useLocation();

    useImperativeHandle(
      ref,
      (): ProductFormHandle => ({
        getFormData: async (params) => {
          setIsDraft(!!params?.draftMode);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const valid = await form.validateFields();

          const kosherDetails = await productKosherFormRef.current?.getFormData(
            params
          );

          return {
            ...form.getFieldsValue(),
            ...kosherDetails,
            departmentId: "50aa4dec-e76b-4e14-950e-c327d901975f",
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
        <Form.Item<ProductToPost> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tipo de producto"
              name="productTypeId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}>
              <GenericSelect
                fetcher={() => ProductTypesAPI.getProductTypes()}
                placeholder="Selecciona un tipo de producto"
                optionLabel="name"
                defaultValue={defaultValuesFromUrl?.productTypeId}
                fixedDefaultValue={!!defaultValuesFromUrl?.productTypeId}
                optionKey={"id"}
                queryKey={["productTypes"]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ProductToPost>
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
            <Form.Item<ProductToPost>
              label="Codigo"
              name="code"
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
            <Form.Item
              label="Unidad de medida"
              name="unitId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}>
              <GenericSelect
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
            <Form.Item<ProductionDataToPost>
              label="Descripción del producto"
              name="description"
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
            <Form.Item<ProductToPost>
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
            <Form.Item<ProductionDataToPost>
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
            <Form.Item<ProductToPost>
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
            <Form.Item<ProductToPost>
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
            <Form.Item<ProductToPost>
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
            <Form.Item
              label="Proveedor"
              name="providerId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}>
              <GenericSelect
                fetcher={() => ProvidersAPI.getProviders()}
                placeholder="Selecciona un proveedor"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["providers"]}
                addForm={<ProvidersManage enableRedirect={false} />}
                addFormTitle="Agregar Proveedor"
              />
            </Form.Item>
          </Col>
          <Col span={"auto"}>
            <Form.Item<ProductToPost> label="Kosher" name="isKosher">
              <Switch checked={isKosher} />
            </Form.Item>
          </Col>
          <Col span={"auto"}>
            <Form.Item<PurchaseDataToPost> label="Alergeno" name="allergen">
              <Switch checked={isAllergen} />
            </Form.Item>
          </Col>
        </Row>
        {isKosher && (
          <Row
            gutter={16}
            className="bg-gray-100 p-5 shadow-md rounded-md mb-5">
            <Col span={24}>
              <ProductKosherForm
                entity={_props.entity?.kosherDetails}
                ref={productKosherFormRef}
              />
            </Col>
          </Row>
        )}
      </Form>
    );
  }
);

export default ProductFormAdmin;
