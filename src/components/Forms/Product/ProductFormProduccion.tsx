import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MeasurementAPI,
  PPProductTypesAPI,
  ProductPresentationAPI,
  ProductTypesAPI,
} from "../../../api";
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
    const formProductType = Form.useWatch("productTypeId", form);
    const ppCategoryId = Form.useWatch("ppCategoryId", form);

    const { data: ppCategoriesData, isLoading: loadingPPCategories } = useQuery<
      GetPPProductTypesResponse | APIError
    >({
      queryKey: ["ppCategories"],
      queryFn: async () => {
        const result = await PPProductTypesAPI.getProductTypes();
        if ("data" in result) {
          return result.data;
        }
        return [];
      },
      refetchOnWindowFocus: false,
    });

    let selectedPPCategory = null;
    if (ppCategoryId && ppCategoriesData) {
      selectedPPCategory = ppCategoriesData.find(
        (category) => category.id === ppCategoryId
      );
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
            departmentId: "6cebdab4-cc4b-4bee-b011-286c0ce6979b",
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

      if (defaultValuesFromUrl) {
        form.setFieldsValue(defaultValuesFromUrl);

        if (
          defaultValuesFromUrl.productType?.id ==
          import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PP_ID
        ) {
          // form.setFieldsValue({ isKosher: true });
        }
      }
    }, [form, _props.entity, defaultValuesFromUrl]);

    return (
      <Form
        form={form}
        name="productForm"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Product> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12} lg={8} xl={3}>
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
                disabled={true}
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
          {formProductType == import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PP_ID && (
            <Col xs={24} md={12} lg={8} xl={6}>
              <Form.Item<Product>
                label="Categoria de PP"
                name="ppCategoryId"
                rules={[
                  {
                    required: true,
                    message: "Este campo es obligatorio",
                  },
                ]}>
                <GenericSelect
                  disabled={disabled}
                  fetcher={() => PPProductTypesAPI.getProductTypes()}
                  placeholder="Selecciona una categoria de PP"
                  optionLabel="mask"
                  optionKey={"id"}
                  queryKey={["ppCategories"]}
                />
              </Form.Item>
            </Col>
          )}
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
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={5}>
            <Form.Item<Product>
              label="Codigo"
              name="code"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input
                disabled={disabled}
                addonBefore={selectedPPCategory?.prefix}
                addonAfter={selectedPPCategory?.suffix}
              />
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
                disabled={disabled}
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
          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<Product>
              label="Presentación"
              name="presentation"
              rules={[
                {
                  required: true,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <GenericSelect
                fetcher={() => ProductPresentationAPI.getProductPresentations()}
                placeholder="Selecciona una presentación"
                optionLabel="name"
                optionKey={"name"}
                queryKey={["productPresentation"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}>
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
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}>
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
          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<Product>
              label="Descripción del proveedor"
              name="providerDescription"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  max: 150,
                  message: "No puede exceder los 150 caracteres",
                },
              ]}>
              <TextArea
                disabled={disabled}
                style={{ resize: "none" }}
                maxLength={150}
                placeholder="Descripción del proveedor"
                rows={4}></TextArea>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<Product>
              label="Notas del producto"
              name="notes"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  max: 300,
                  message: "No puede exceder los 300 caracteres",
                },
              ]}>
              <TextArea
                disabled={disabled}
                style={{ resize: "none" }}
                maxLength={300}
                placeholder="Descripción del proveedor"
                rows={4}></TextArea>
            </Form.Item>
          </Col>
        </Row>
        {formProductType == import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PP_ID && (
          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<Product>
              label="Notas de PP"
              name="ppNotes"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  max: 300,
                  message: "No puede exceder los 300 caracteres",
                },
              ]}>
              <TextArea
                disabled={disabled}
                style={{ resize: "none" }}
                maxLength={150}
                placeholder="Descripción del proveedor"
                rows={4}></TextArea>
            </Form.Item>
          </Col>
        )}

        {isKosher ||
          (_props.entity?.isKosher && (
            <Row
              gutter={16}
              className="bg-gray-100 p-5 shadow-md rounded-md mb-5">
              <Col span={24}>
                <ProductKosherForm
                  ref={productKosherFormRef}
                  entity={
                    _props.entity?.isKosher ? _props.entity.kosherDetails : null
                  }
                  mode={_props.formMode}
                />
              </Col>
            </Row>
          ))}
      </Form>
    );
  }
);

export default ProductFormProduccion;
