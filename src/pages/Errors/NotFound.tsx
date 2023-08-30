import { Button, Image, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/not-found.svg";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Content className="mx-[16px] mt-[50px]">
      <div className="px-[24px] bg-white">
        <div className="mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <Typography.Title className="pt-2" level={1}>
              ¡No se encontro la pagina solicitada!
            </Typography.Title>
            <Button className="mx-auto" onClick={() => navigate("/")}>
              Volver
            </Button>
          </div>
          <Image
            preview={false}
            src={notFoundImg}
            className=""
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </div>
    </Content>
  );
}
