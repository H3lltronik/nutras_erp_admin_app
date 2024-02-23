import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, Row, Switch } from "antd";
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
  ProductTypeCategoriesAPI,
  ProductPresentationAPI,
  ProductTypesAPI,
  ProvidersAPI,
} from "../../../api";
import { urlWithGetKeyToJson } from "../../../lib/entity.utils";
import { useFormModeChecker } from "../../../lib/form/disabledChecked";
import { ProductFormResult } from "../../../pages/Products/lib/formatProductForm";
import { GenericSelect } from "../Common/GenericSelect";
import ProductKosherForm, {
  ProductKosherFormHandle,
} from "./ProductKosherForm";
import _ from "lodash";
import { ProvidersManage } from "../../../pages/Providers";
import dayjs from "dayjs";

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
  hiddenFields?: {
    [K in keyof Product]?: boolean;
  };
  requiredFields?: {
    [K in keyof Product]?: boolean;
  };
};

const ProductFormProduccion = forwardRef<ProductFormHandle, ProductFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const productKosherFormRef = useRef<ProductKosherFormHandle | null>(null);
    const isKosher = Form.useWatch("isKosher", form);
    const { disabled } = useFormModeChecker({ formMode: _props.formMode });
    const formProductType = Form.useWatch("productTypeId", form);
    const productTypeCategoryId = Form.useWatch("productTypeCategoryId", form);

    const { data: ppCategoriesData, isLoading: loadingPPCategories } = useQuery<
      GetProductTypeCategoriesResponse | APIError
    >({
      queryKey: ["ppCategories"],
      queryFn: async () => {
        const result = await ProductTypeCategoriesAPI.getProductTypes();
        if ("data" in result) {
          return result.data;
        }
        return [];
      },
      refetchOnWindowFocus: false,
    });

    let selectedProductTypeCategory = null;
    if (productTypeCategoryId && ppCategoriesData) {
      selectedProductTypeCategory = ppCategoriesData.find(
        (category) => category.id === productTypeCategoryId
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

    const kosherDetails = useMemo(() => {
      const result = {
        ..._props.entity?.kosherDetails,
        certificateValidity: dayjs(
          _props.entity?.kosherDetails?.certificateValidity
        ),
      };
      return result;
    }, [_props.entity]);

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

      const getProductsTypes = async () => {
        const result = await ProductTypesAPI.getProductTypes({
          department: import.meta.env.VITE_DBVAL_DEPARTMENT_PRODUCTION_ID,
        });
        setProductTypes(result.data);
      }

      getProductsTypes();
    }, [form, _props.entity, defaultValuesFromUrl]);

    const getCodeAddon = () => {
      const productTypeId = form.getFieldValue("productTypeId");
      const productType = productTypes.find(
        (type) => type.id === productTypeId
      );
      return productType?.name ?? "";
    }

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
          <Col xs={24} md={12} lg={8} xl={4} className={
            _props.hiddenFields?.productTypeId ? "hidden" : ""
          }>
            <Form.Item<Product>
              label="Tipo de producto"
              name="productTypeId"
              rules={[
                {
                  required: 
                  _props.requiredFields?.productTypeId &&
                  !_props.hiddenFields?.productTypeId &&
                  !isDraft,
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
            <Col xs={24} lg={12} xl={10} xxl={8} className={
              _props.hiddenFields?.productTypeCategoryId ? "hidden" : ""
            }>
              <Form.Item<Product>
                label="Categoria de PP"
                name="productTypeCategoryId"
                rules={[
                  {
                    required: 
                    _props.requiredFields?.productTypeCategoryId &&
                    !_props.hiddenFields?.productTypeCategoryId,
                    message: "Este campo es obligatorio",
                  },
                ]}>
                <GenericSelect
                  disabled={disabled}
                  fetcher={() => ProductTypeCategoriesAPI.getProductTypes()}
                  placeholder="Selecciona una categoria de PP"
                  optionLabel="name"
                  optionKey={"id"}
                  queryKey={["ppCategories"]}
                />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={12} lg={8} xl={5} className={
            _props.hiddenFields?.code ? "hidden" : ""
          }>
            <Form.Item<Product>
              label="Codigo"
              name="code"
              rules={[
                {
                  required:
                  _props.requiredFields?.code &&
                  !_props.hiddenFields?.code &&
                  !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  pattern: /^\d+$/,
                  message: "El código debe ser numérico",
                },
                {
                  min: 3,
                  message: "El código debe tener 3 caracteres",
                }
              ]}>
              <Input
                disabled={disabled}
                placeholder="Código"
                maxLength={3}
                addonBefore={getCodeAddon()}
                addonAfter={selectedProductTypeCategory?.suffix}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6} className={
            _props.hiddenFields?.commonName ? "hidden" : ""
          }>
            <Form.Item<Product>
              label="Nombre Común"
              name="commonName"
              rules={[
                {
                  required:
                  _props.requiredFields?.commonName &&
                  !_props.hiddenFields?.commonName &&
                  !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Nombre común del producto"
                />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.description ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Descripción del producto"
              name="description"
              rules={[
                {
                  required:
                    _props.requiredFields?.description &&
                    !_props.hiddenFields?.description &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <TextArea
                disabled={disabled}
                placeholder="Descripción del producto"
                style={{ resize: "none" }}
                maxLength={150}
                rows={4}
              ></TextArea>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6} className={
            _props.hiddenFields?.unitId ? "hidden" : ""
          }>
            <Form.Item<Product>
              label="Unidad de medida"
              name="unitId"
              rules={[
                {
                  required:
                  _props.requiredFields?.unitId &&
                  !_props.hiddenFields?.unitId &&
                  !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <GenericSelect
                disabled={disabled}
                fetcher={() => MeasurementAPI.getMeasurements()}
                placeholder="Selecciona una unidad"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["measurements"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.presentation ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Presentación"
              name="presentation"
              rules={[
                {
                  required:
                    _props.requiredFields?.presentation &&
                    !_props.hiddenFields?.presentation &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <GenericSelect
                disabled={disabled}
                fetcher={() => ProductPresentationAPI.getProductPresentations()}
                placeholder="Selecciona una presentación"
                optionLabel="name"
                optionKey={"name"}
                queryKey={["productPresentation"]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.mold ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Molde"
              name="mold"
              rules={[
                {
                  required:
                    _props.requiredFields?.mold &&
                    !_props.hiddenFields?.mold &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Molde"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.packaging ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Empaque"
              name="packaging"
              rules={[
                {
                  required:
                    _props.requiredFields?.packaging &&
                    !_props.hiddenFields?.packaging &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Empaque"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.providerId ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Proveedor"
              name="providerId"
              rules={[
                {
                  required:
                    _props.requiredFields?.providerId &&
                    !_props.hiddenFields?.providerId &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <GenericSelect
                disabled={disabled}
                fetcher={() => ProvidersAPI.getProviders()}
                placeholder="Selecciona un proveedor"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["providers"]}
                addForm={
                  <ProvidersManage inModal={true} enableRedirect={false} />
                }
                addFormTitle="Agregar Proveedor"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.quantityPerUnit ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Cantidad x unidad"
              name="quantityPerUnit"
              rules={[
                {
                  required:
                    _props.requiredFields?.quantityPerUnit &&
                    !_props.hiddenFields?.quantityPerUnit &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Cantidad x unidad"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}
            className={
              _props.hiddenFields?.notes ? "hidden" : ""
            }>
            <Form.Item<Product>
              label="Notas"
              name="notes"
              rules={[
                {
                  required:
                    _props.requiredFields?.notes &&
                    !_props.hiddenFields?.notes &&
                    !isDraft,
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
                placeholder="Notas"
                rows={4}></TextArea>
            </Form.Item>
          </Col>

          <Col span={"auto"} className={
            _props.hiddenFields?.isKosher ? "hidden" : ""
          }>
            <Form.Item<Product> label="Kosher" name="isKosher">
              <Switch disabled={disabled} checked={isKosher} />
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
                    mode={_props.formMode}
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

export default ProductFormProduccion;
