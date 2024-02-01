import { Col, Form, Input, Row, Switch } from "antd";
import dayjs from "dayjs";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
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
  formMode?: FormMode;
};

const ProductFormCompras = forwardRef<ProductFormHandle, ProductFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<string>("");
    const productKosherFormRef = useRef<ProductKosherFormHandle | null>(null);
    const isKosher = Form.useWatch("isKosher", form);

    const getCodeAddon = (): string => {
      const productType = productTypes.find((type: ProductType) => type.id === selectedProductType);
      return productType?.name ?? '';
    }

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
            departmentId: "65a427ba-d703-4f8f-b688-ccfa44d62db0",
            isDraft: !!params?.draftMode,
            isPublished: !params?.draftMode,
          };
        },
      })
    );

    useEffect(() => {
      if (_props.entity) form.setFieldsValue(_props.entity);

      const getProductTypes = async () => {
        const types: any = await ProductTypesAPI.getProductTypes({
          department: import.meta.env.VITE_DBVAL_DEPARTMENT_COMPRAS_ID,
        });

        console.log("types", types);
        setProductTypes(types.data);
      }

      getProductTypes();4
    }, [form, _props.entity]);

    const kosherDetails = useMemo(() => {
      const result = {
        ..._props.entity?.kosherDetails,
        certificateValidity: dayjs(
          _props.entity?.kosherDetails?.certificateValidity
        ),
      };
      console.log("_props.entity?.kosherDetails", result);
      return result;
    }, [_props.entity]);

    return (
      <Form
        form={form}
        name="productForm"
        layout="vertical"
        initialValues={{ isKosher: false, allergen: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Product> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12} lg={8} xl={6}>
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
                fetcher={() =>
                  ProductTypesAPI.getProductTypes({
                    department: import.meta.env
                      .VITE_DBVAL_DEPARTMENT_COMPRAS_ID,
                  })
                }
                onChange={(value) => setSelectedProductType(value)}
                placeholder="Selecciona un tipo de producto"
                optionLabel="description"
                optionKey={"id"}
                queryKey={["productTypes"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}>
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

          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<Product>
              label="Codigo"
              name="code"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input addonBefore={getCodeAddon()} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}>
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
                fetcher={() => MeasurementAPI.getMeasurements()}
                placeholder="Selecciona una unidad de medida"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["measurements"]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8} xl={6}>
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

          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<Product>
              label="Proveedor"
              name="providerId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
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
          <Col xs={24} md={12} lg={8} xl={6}>
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

          <Col span={24}>
            {isKosher && (
              <Row
                gutter={16}
                className="bg-gray-100 p-5 shadow-md rounded-md mb-5">
                <Col span={24}>
                  <ProductKosherForm
                    ref={productKosherFormRef}
                    entity={kosherDetails}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
);

export default ProductFormCompras;
