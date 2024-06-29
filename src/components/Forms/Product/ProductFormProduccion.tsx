import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, Row, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
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
  ProductTypesAPI,
  ProvidersAPI,
} from "../../../api";
import { urlWithGetKeyToJson } from "../../../lib/entity.utils";
import { useFormModeChecker } from "../../../lib/form/disabledChecked";
import { ProductFormResult } from "../../../pages/Products/lib/formatProductForm";
import { GenericSelect } from "../Common/GenericSelect";
import { PresentationInput } from "./PresentationInput";
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
    const [productTypeCategories, setProductTypeCategories] = useState<ProductTypeCategory[]>([]);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [measurement, setMeasurement] = useState<Measurement | null>(null);
    const productKosherFormRef = useRef<ProductKosherFormHandle | null>(null);
    const isKosher = Form.useWatch("isKosher", form);
    const isVariableQuantityPerUnit = Form.useWatch("variableQuantityPerUnit", form);
    const { disabled } = useFormModeChecker({ formMode: _props.formMode });
    const formProductType = Form.useWatch("productTypeId", form);
    const productTypeCategoryId = Form.useWatch("productTypeCategoryId", form);
    const isActive = Form.useWatch("isActive", form);

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
      };

      const getProductTypeCategories = async () => {
        const result = await ProductTypeCategoriesAPI.getProductTypes();
        setProductTypeCategories(result.data);
      }

      const getMeasurements = async () => {
        const result = await MeasurementAPI.getMeasurements();
        setMeasurements(result.data);
        if(_props.entity?.unitId) {
          const selectedMeasurement = result.data.find(
            (m) => m.id === _props.entity?.unitId
          );
          setMeasurement(selectedMeasurement ?? null);
        }
      };

      getProductsTypes();
      getProductTypeCategories();
      getMeasurements();
    }, [form, _props.entity, defaultValuesFromUrl]);

    const getCodeAddon = () => {
      const productTypeId = form.getFieldValue("productTypeId");
      const productType = productTypes.find(
        (type) => type.id === productTypeId
      );
      return productType?.name ?? "";
    };

    const canQuantityPerUnitBeVariable = () => {
      const suffixesThatForbidvariableQuantityPerUnit = ["", "A"];
      const productTypeCategoryId = form.getFieldValue("productTypeCategoryId");
      const productTypeCategory = productTypeCategories.find(
        (category) => category.id === productTypeCategoryId
      );
      const canBeVariable = !suffixesThatForbidvariableQuantityPerUnit.includes(
        productTypeCategory?.suffix ?? ""
      );

      return canBeVariable;
    }

    const onVariableQuantityPerUnitChange = (value: boolean) => {
      if (value === true) {
        form.setFieldsValue({ quantityPerUnit: "Variable" });
      }
      else {
        form.setFieldsValue({ quantityPerUnit: "" });
      }
    }

    const isPP =
      formProductType == import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PP_ID;
    const isPT =
      formProductType == import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PT_ID;

    return (
      <Form
        form={form}
        name="productForm"
        layout="vertical"
        initialValues={{ remember: true, providerId: '170f3bfc-e97c-4d93-a67f-e4f756eba5a9' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Product> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col
            xs={24}
            md={12}
            lg={8}
            xl={4}
            className={_props.hiddenFields?.productTypeId ? "hidden" : ""}>
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
          {isPP && (
            <Col
              xs={24}
              lg={12}
              xl={10}
              xxl={8}
              className={
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
                  onChange={() => {
                    form.setFieldsValue({
                      variableQuantityPerUnit: false,
                      quantityPerUnit: "",
                    });
                  }}
                  optionLabel="name"
                  optionKey={"id"}
                  queryKey={["ppCategories"]}
                />
              </Form.Item>
            </Col>
          )}
          <Col
            xs={24}
            md={12}
            lg={8}
            xl={5}
            className={_props.hiddenFields?.code ? "hidden" : ""}>
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
                },
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
          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.commonName ? "hidden" : ""}>
            <Form.Item<Product>
              label="Nombre común"
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
          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.description ? "hidden" : ""}>
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
                rows={4}></TextArea>
            </Form.Item>
          </Col>
          {!isPP && (
            <Col
              xs={24}
              md={12}
              lg={8}
              xl={6}
              className={_props.hiddenFields?.presentation ? "hidden" : ""}>
              <Form.Item<Product>
                label={ isPT ? "Presentación PT" : (isPP ? "Presentación PP" : "Presentación") }
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
                  fetcher={() =>
                    ProductPresentationAPI.getProductPresentations()
                  }
                  placeholder="Selecciona una presentación"
                  optionLabel="name"
                  optionKey={"name"}
                  queryKey={["productPresentation"]}
                />
              </Form.Item>
            </Col>
          )}

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.unitId ? "hidden" : ""}>
            <Form.Item<Product>
              label="Unidad de medida master"
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
                onChange={(value) => {
                  const selectedMeasurement = measurements.find(
                    (m) => m.id === value
                  );
                  setMeasurement(selectedMeasurement ?? null);
                }}
                placeholder="Selecciona una unidad de medida master"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["measurements"]}
              />
            </Form.Item>
          </Col>

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.packaging ? "hidden" : ""}>
              <Form.Item<Product>
              label="Empaque master"
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
              <Select disabled={disabled} placeholder="Seleccione un empaque master" allowClear>
                <Select.Option value="Bolsa">Bolsa</Select.Option>
                <Select.Option value="Caja">Caja</Select.Option>
                <Select.Option value="Cubeta">Cubeta</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.quantityPerUnit ? "hidden" : ""}>
            <Form.Item<Product>
              label={isPP ? "Cantidad x unidad master" : "Cantidad por empaque"}
              name="quantityPerUnit"
              rules={[
                {
                  required:
                    _props.requiredFields?.quantityPerUnit &&
                    !_props.hiddenFields?.quantityPerUnit &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  pattern: isVariableQuantityPerUnit ? undefined : /^\d+(\.\d{1,2})?$/,
                  message: "La cantidad debe ser numérica, y puede tener hasta 2 decimales",
                },
              ]}>
              <Input
              disabled={disabled || isVariableQuantityPerUnit}
              placeholder="Cantidad x unidad"
              addonAfter={measurement?.name ?? ""}/>
            </Form.Item>
          </Col>

          {
            isPT && (
              <>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                  xl={6}
                  className={_props.hiddenFields?.packaging ? "hidden" : ""}>
                  <Form.Item<Product>
                    label="Empaque primario"
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
                    <>
                      <Select disabled={disabled} placeholder="Empaque" allowClear>
                        <Select.Option value="Bolsa">Bolsa</Select.Option>
                        <Select.Option value="Bobina impresa">
                          Bobina impresa
                        </Select.Option>
                        <Select.Option value="Bobina transparente">
                          Bobina transparente
                        </Select.Option>
                        <Select.Option value="Bolsa pouch">
                          Bolsa pouch
                        </Select.Option>
                      </Select>
                    </>
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                  xl={6}
                  className={_props.hiddenFields?.packagingSecondary ? "hidden" : ""}>
                  <Form.Item<Product>
                    label="Empaque secundario"
                    name="packagingSecondary"
                    rules={[
                      {
                        required:
                          _props.requiredFields?.packaging &&
                          !_props.hiddenFields?.packaging &&
                          !isDraft,
                        message: "Este campo es obligatorio",
                      },
                    ]}>
                    <Select disabled={disabled} placeholder="Empaque" allowClear>
                      <Select.Option value="N/A">N/A</Select.Option>
                      <Select.Option value="Caja">Caja</Select.Option>
                      <Select.Option value="Bolsa">Bolsa</Select.Option>
                      <Select.Option value="Bulto">Bulto</Select.Option>
                      <Select.Option value="Super Saco">Super Saco</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )
          }

          {
            isPP && canQuantityPerUnitBeVariable() &&
            <Col
              xs={24}
              md={12}
              lg={6}
              xl={4}
              className={_props.hiddenFields?.variableQuantityPerUnit ? "hidden" : ""}>
              <Form.Item<Product>
                label="Cantidad variable"
                name="variableQuantityPerUnit"
                rules={[
                  // {
                  //   required:
                  //     _props.requiredFields?.variableQuantityPerUnit &&
                  //     !_props.hiddenFields?.variableQuantityPerUnit &&
                  //     !isDraft,
                  //   message: "Este campo es obligatorio",
                  // },
                ]}>
                <Switch disabled={disabled} checked={isVariableQuantityPerUnit} onChange={onVariableQuantityPerUnitChange} />
              </Form.Item>
            </Col>
          }

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.mold ? "hidden" : ""}>
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
              <Select disabled={disabled} placeholder="Molde" allowClear>
                <Select.Option value="N/A">N/A</Select.Option>
                <Select.Option value="Dona">Dona</Select.Option>
                <Select.Option value="Puff">Puff</Select.Option>
                <Select.Option value="Mini puff">Mini puff</Select.Option>
                <Select.Option value="Balin">Balin</Select.Option>
                <Select.Option value="Munición">Munición</Select.Option>
                <Select.Option value="Arroz">Arroz</Select.Option>
                <Select.Option value="Arroz chico">Arroz chico</Select.Option>
                <Select.Option value="Arroz grande">Arroz grande</Select.Option>
                <Select.Option value="Esfera">Esfera</Select.Option>
                <Select.Option value="Concha">Concha</Select.Option>
                <Select.Option value="Hojuela">Hojuela</Select.Option>
                <Select.Option value="Bite chico">Bite chico</Select.Option>
                <Select.Option value="Bite grande">Bite grande</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col
            span={"auto"}
            className={
              _props.hiddenFields?.isKosher ||
              import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PT_ID != formProductType
                ? "hidden"
                : ""
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

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.providerId ? "hidden" : ""}>
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
                disabled={disabled || isPP}
                fetcher={() => ProvidersAPI.getProviders({}, true)}
                placeholder="Selecciona un proveedor"
                optionLabel="name"
                optionKey={"id"}
                queryKey={["providers"]}
                // addForm={
                //   <ProvidersManage inModal={true} enableRedirect={false} />
                // }
                addFormTitle="Agregar Proveedor"
              />
            </Form.Item>
          </Col>

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.notes ? "hidden" : ""}>
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

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.coil ? "hidden" : ""}>
              <Form.Item<Product>
              label="Bobina"
              name="coil"
              rules={[
                {
                  required:
                    _props.requiredFields?.coil &&
                    !_props.hiddenFields?.coil &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Select disabled={disabled} placeholder="Seleccione un embobinado" allowClear>
                <Select.Option value="Transparente">Transparente</Select.Option>
                <Select.Option value="Impresa">Impresa</Select.Option>
                <Select.Option value="N.A.">N.A.</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col
            xs={24}
            md={12}
            lg={8}
            xl={6}
            className={_props.hiddenFields?.client ? "hidden" : ""}>
              <Form.Item<Product>
              label="Cliente (Estado)"
              name="client"
              rules={[
                {
                  required:
                    _props.requiredFields?.client &&
                    !_props.hiddenFields?.client &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
                <Input
                  disabled={disabled}
                  placeholder="Cliente (Estado)"/>
            </Form.Item>
          </Col>

          <Col span={"auto"} className={_props.hiddenFields?.isActive ? "hidden" : ""}>
            <Form.Item<Product> label="Activo" name="isActive">
              <Switch disabled={disabled} checked={isActive} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default ProductFormProduccion;
