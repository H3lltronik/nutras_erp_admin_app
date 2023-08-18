import { Breadcrumb, Layout, Typography, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useEffect, useRef } from "react";
// import { measurementTypeAPI } from "../../api";
import MeasurementTypeForm, { MeasurementTypeFormHandle } from "../../components/Forms/MeasurementType/MeasurementTypeForm";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const MeasurementTypes: React.FC = () => {
  const measurementTypeFormRef = useRef<MeasurementTypeFormHandle | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    (async () => {
      // const res = await measurementTypeAPI.getmeasurementTypes();
      // console.log(res);
    })();
  }, []);

  const submitForm = async () => {
    const measurementTypeFormData = await measurementTypeFormRef.current?.getFormData();
    console.log("measurementTypeFormData", measurementTypeFormData);
  };

  const breadcrumb: ItemType[] = [
    {
      title: "Administración",
    },
    {
      title: "Unidades de medida",
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}>
          <section className="max-w-[1500px]">
            <MeasurementTypeForm ref={measurementTypeFormRef} />

            <button
              className="bg-gray-500 py-1 px-2 rounded-lg text-white"
              onClick={submitForm}>
              Submit form
            </button>
          </section>
        </div>
      </Content>
    </>
  );
};
