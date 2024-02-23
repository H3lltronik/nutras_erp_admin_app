import { Col, Form, Image, Input, Row, Select } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputMask from "react-input-mask";
import { flags } from "../../../assets/flags/index.ts";
import { useFormModeChecker } from "../../../lib/form/disabledChecked.tsx";
import { banks, countriesWithLada } from "../Common/Constants";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type ProviderFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Provider>;
};

type ProviderFormProps = {
  entity?: Provider | null;
  inModal?: boolean;
  formMode?: FormMode;
  hiddenFields?: {
    [K in keyof Provider]?: boolean;
  };
  requiredFields?: {
    [K in keyof Provider]?: boolean;
  };
};

const ProviderForm = forwardRef<ProviderFormHandle, ProviderFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<
      string | undefined
    >();
    const { disabled } = useFormModeChecker({ formMode: _props.formMode });

    useImperativeHandle(
      ref,
      (): ProviderFormHandle => ({
        getFormData: async (params) => {
          setIsDraft(!!params?.draftMode);
          const valid = await form.validateFields();

          return {
            ...form.getFieldsValue(),
            isDraft: !!params?.draftMode,
            isPublished: !params?.draftMode,
          };
        },
      })
    );

    useEffect(() => {
      if (_props.entity) form.setFieldsValue(_props.entity);
    }, [form, _props.entity]);

    var writeOnlyNumbers = (event: any) => {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
    };
    var writeOnlyUpperCase = (event: any) => {
      event.target.value = event.target.value.toUpperCase();
    };

    return (
      <Form
        form={form}
        name="providerForm"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Provider> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16} className="justify-between">
          <Col
            className={_props.hiddenFields?.code ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider>
              label="Código"
              name="code"
              rules={[
                { required:
                  (_props.requiredFields?.code ?? true) &&
                  !_props.hiddenFields?.code &&
                  !isDraft,
                  message: "Este campo es obligatorio" },
                {
                  min: 4,
                  message: "El código debe tener 4 caracteres",
                },
                {
                  max: 4,
                  message: "El código debe tener 4 caracteres",
                },
                {
                  pattern: /^[A-Za-z0-9]+$/,
                  message: "Solo se aceptan letras y números",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Código de proveedor"
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.name ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6})}>
            <Form.Item<Provider>
              label="Nombre"
              name="name"
              rules={[
                { required:
                  _props.requiredFields?.name &&
                  !_props.hiddenFields?.name &&
                  !isDraft,
                  message: "Este campo es obligatorio" },
                {
                  min: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                {
                  max: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Nombre de proveedor"
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.RFC ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider>
              label="RFC"
              name="RFC"
              rules={
                [
                  { required:
                    _props.requiredFields?.RFC &&
                    !_props.hiddenFields?.RFC &&
                    !isDraft,
                    message: "Este campo es obligatorio" },
                  {
                    pattern: /^[A-Za-z0-9]+$/,
                    message: "Solo se aceptan letras y números",
                  },
                  {
                    min: 12,
                    message: "El RFC debe tener 12 caracteres",
                  },
                  {
                    max: 13,
                    message: "El RFC no puede exceder los 13 caracteres",
                  },
                ]
              }
              >
              <Input
                disabled={disabled}
                placeholder="RFC de proveedor"
                maxLength={13}
                onKeyUpCapture={writeOnlyUpperCase}
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.businessName ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider>
              label="Razon Social"
              name="businessName"
              rules={[
                { required:
                  _props.requiredFields?.businessName &&
                  !_props.hiddenFields?.businessName &&
                  !isDraft,
                  message: "Este campo es obligatorio"
                },
                {
                  min: 3,
                  message: "La razón social debe tener al menos 3 caracteres",
                },
                {
                  max: 50,
                  message: "La razón social no puede exceder los 50 caracteres",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Razón social de proveedor"
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.service ? "hidden" : ""}
            {...(_props.inModal ? { span: 12 } : { xs: 24, md: 12, lg: 8 })}>
            <Form.Item<Provider>
              label="Servicio (Servicio que da el proveedor)"
              name="service"
              rules={[
                { 
                  required:
                  _props.requiredFields?.service &&
                  !_props.hiddenFields?.service &&
                  !isDraft,
                  message: "Este campo es obligatorio" },
                {
                  min: 3,
                  message: "El servicio debe tener al menos 3 caracteres",
                },
                {
                  max: 50,
                  message: "El servicio no puede exceder los 50 caracteres",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Servicio que da el proveedor"
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.phone ? "hidden" : ""}
            {...(_props.inModal ? { span: 12 } : { xs: 24, md: 12, lg: 8 })}>
            <Row gutter={8}>
              <Col>
                <Form.Item<Provider>
                  label="Lada"
                  name="lada"
                  rules={[
                    {
                      required:
                        _props.requiredFields?.phone &&
                        !_props.hiddenFields?.phone &&
                        !isDraft,
                      message: "Este campo es obligatorio",
                    }
                  ]}>
                  <Select
                    disabled={disabled}
                    placeholder="Lada"
                    style={{ minWidth: 90 }}
                    onChange={(value) => setSelectedCountry(value)}>
                    {countriesWithLada.map((country) => {
                      return (
                        <Option key={country.name} value={country.lada}>
                          <Image src={flags[country.img]} width={24} />
                          {` +${country.lada}`}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col
                className={_props.hiddenFields?.phone ? "hidden" : ""}
                style={{ flex: 1 }}>
                <Form.Item<Provider>
                  label="Teléfono"
                  name="phone"
                  rules={[
                    {
                      required:
                        _props.requiredFields?.phone &&
                        !_props.hiddenFields?.phone &&
                        !isDraft,
                      message: "Este campo es obligatorio",
                    },
                    {
                      pattern: /^\d+\-\d+\-\d+$/,
                      message: "Solo se aceptan números",
                    },
                    {
                      min: 8,
                      message: "El teléfono debe tener entre 8 y 12 dígitos",
                    },
                  ]}>
                  <InputMask
                    disabled={disabled}
                    mask="999-999-999999"
                    maskChar={null}>
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        disabled={disabled}
                        placeholder="Teléfono"
                        maxLength={14}
                        onKeyUp={writeOnlyNumbers}
                      />
                    )}
                  </InputMask>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col
            className={_props.hiddenFields?.email ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider>
              label="Correo"
              name="email"
              rules={[
                {
                  required:
                    _props.requiredFields?.email &&
                    !_props.hiddenFields?.email &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  type: "email",
                  message: "El formato del correo no es válido",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Correo de proveedor"
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.paymentEmail ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider>
              label="Correo de pagos"
              name="paymentEmail"
              rules={[
                {
                  required:
                    _props.requiredFields?.paymentEmail &&
                    !_props.hiddenFields?.paymentEmail &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  type: "email",
                  message: "El formato del correo no es válido",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Correo de pagos"
                />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.bank ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider> label="Banco" name="bank" rules={[
              {
                required:
                  _props.requiredFields?.bank &&
                  !_props.hiddenFields?.bank &&
                  !isDraft,
                message: "Este campo es obligatorio",
              }
            ]}>
              <Select
                disabled={disabled}
                placeholder="Selecciona un banco"
                style={{ width: "100%" }}>
                {banks.map((bank) => (
                  <Option key={bank} value={bank}>
                    {bank}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.clabeAccount ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider> label="Cuenta CLABE" name="clabeAccount" rules={[
              {
                required:
                  _props.requiredFields?.clabeAccount &&
                  !_props.hiddenFields?.clabeAccount &&
                  !isDraft,
                message: "Este campo es obligatorio",
              },
              {
                pattern: /^\d+$/,
                message: "Solo se aceptan números",
              },
              {
                min: 18,
                message: "La cuenta CLABE debe tener 18 dígitos",
              },
              {
                max: 18,
                message: "La cuenta CLABE debe tener 18 dígitos",
              }
            ]}>
              <Input
                disabled={disabled}
                placeholder="Cuenta CLABE"
                maxLength={18}
                onKeyUp={writeOnlyNumbers}
              />
            </Form.Item>
          </Col>
          <Col
            className={_props.hiddenFields?.accountNumber ? "hidden" : ""}
            {...(_props.inModal
              ? { span: 12 }
              : { xs: 24, md: 12, lg: 8, xl: 6 })}>
            <Form.Item<Provider>
              label="Número de cuenta"
              name="accountNumber"
              rules={[
                {
                  required:
                    _props.requiredFields?.accountNumber &&
                    !_props.hiddenFields?.accountNumber &&
                    !isDraft,
                  message: "Este campo es obligatorio",
                },
                {
                  pattern: /^\d+$/,
                  message: "Solo se aceptan números",
                },
                {
                  min: 10,
                  message:
                    "El número de cuenta debe tener al menos 10 caracteres",
                },
                {
                  max: 20,
                  message:
                    "El número de cuenta no puede exceder los 20 caracteres",
                },
              ]}>
              <Input
                disabled={disabled}
                placeholder="Número de cuenta"
                maxLength={20}
                onKeyPress={writeOnlyNumbers}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6} className={_props.hiddenFields?.notes ? "hidden" : ""}>
            <Form.Item<Provider>
              label="Notas de proveedor"
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
                placeholder="Notas de proveedor"
                rows={4}></TextArea>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default ProviderForm;
