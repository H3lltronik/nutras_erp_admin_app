import { Breadcrumb, Layout, Typography, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useEffect, useRef } from "react";
import { MeasurementAPI } from "../../api";
import MeasurementTypeForm, { MeasurementTypeFormHandle } from "../../components/Forms/MeasurementType/MeasurementTypeForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../lib/notify";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const MeasurementsManage: React.FC = () => {
  const measurementTypeFormRef = useRef<MeasurementTypeFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createMeasurement");
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const submitForm = async () => {
    const measurementFormData =
      (await measurementTypeFormRef.current?.getFormData()) as CreateMeasurementRequest;

    setPageLoading(true);
    const result = await mutateAsync(measurementFormData);

    if (result.id) {
      showToast(" Unidad de medida creada correctamente", "success");
      navigate("/admin/measurement-types");
    }

    setPageLoading(false);
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
