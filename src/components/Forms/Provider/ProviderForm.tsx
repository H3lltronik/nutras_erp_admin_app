import { Col, Form, Image, Input, Row, Select } from "antd";
const { Option } = Select;
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputMask from "react-input-mask";
import { flags } from '../../../assets/flags/index.ts';
import { banks, countriesWithLada } from "../Common/Constants"

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
};

const ProviderForm = forwardRef<ProviderFormHandle, ProviderFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

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
    }

    return (
      <Form
        form={form}
        name="providerForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Provider> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<Provider>
              label="Nombre"
              name="name"
              rules={[
                { required: true, message: "Este campo es obligatorio" },
                {
                  min: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                {
                  max: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<Provider>
              label="Razon Social"
              name="businessName"
              rules={[
                { required: true, message: "Este campo es obligatorio" },
                {
                  min: 3,
                  message: "La razón social debe tener al menos 3 caracteres",
                },
                {
                  max: 50,
                  message: "La razón social no puede exceder los 50 caracteres",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<Provider>
              label="Servicio (Servicio que da el proveedor)"
              name="service"
              rules={[
                { required: true, message: "Este campo es obligatorio" },
                {
                  min: 3,
                  message: "El servicio debe tener al menos 3 caracteres",
                },
                {
                  max: 50,
                  message: "El servicio no puede exceder los 50 caracteres",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Row gutter={8}>
              <Col>
                <Form.Item<Provider>
                  label="Teléfono"
                  name="lada"
                  rules={[
                    {
                      required: true,
                      message: "Porfavor selecciona una lada",
                    },
                  ]}
                >
                  <Select
                    style={{minWidth: 90}}
                    onChange={(value) => setSelectedCountry(value)}
                  >
                    {countriesWithLada.map((country) => {
                      return (
                        <Option key={country.name} value={country.lada}>
                          <Image src={flags[country.img]} width={24}/>
                          {` +${country.lada}`}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col style={{flex: 1}}>
                <Form.Item<Provider>
                  name="phone"
                  rules={[
                    { pattern: /^\d+\-\d+\-\d+$/, message: "Solo se aceptan números" },
                    {
                      min: 8,
                      message: "El teléfono debe tener entre 8 y 12 dígitos",
                    },
                  ]}>
                    <InputMask mask="999-999-999999" maskChar={null}>
                      {(inputProps: any) => <Input {...inputProps} maxLength={14} onKeyPress={writeOnlyNumbers} />}
                    </InputMask>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Form.Item<Provider>
              label="Correo"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "El formato del correo no es válido",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<Provider>
              label="Correo de pagos"
              name="paymentEmail"
              rules={[
                {
                  type: "email",
                  message: "El formato del correo no es válido",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<Provider>
              label="Banco"
              name="bank"
              rules={[
                {
                  required: true,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Select style={{ width: '100%' }} placeholder="Selecciona un banco">
                {banks.map((bank) => (
                  <Option key={bank} value={bank}>
                    {bank}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<Provider>
              label="Cuenta CLABE"
              name="clabeAccount"
              rules={[
                { required: true, message: "Este campo es obligatorio" },
                {
                  len: 18,
                  message: "La cuenta CLABE debe tener 18 dígitos exactos",
                },
              ]}>
              <Input maxLength={18} onKeyPress={writeOnlyNumbers} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<Provider>
              label="Número de cuenta"
              name="accountNumber"
              rules={[
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
              <Input maxLength={20} onKeyPress={writeOnlyNumbers} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default ProviderForm;
