import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Popover, Typography, theme } from "antd";

const { Text, Title } = Typography;
const { Header } = Layout;

interface HeaderProps {
  navContent?: React.ReactNode;
  title: string;
}

const popupContent = () => (
  <>
    <div className="w-min-[350px] bg-blue-200 p-5 flex gap-4">
      <Avatar
        className="bg-green-300 outline outline-green-900"
        shape="square"
        size={50}>
        <strong className="text-green-900">AV</strong>
      </Avatar>
      <div className="my-auto max-w-[200px]">
        <Text strong className="text-lg" ellipsis={true}>
          Andrea Valenzuela
        </Text>
      </div>
    </div>
    <div className="flex px-3 py-2 gap-2">
      <Button block>
        <UserOutlined />
        Mi perfil
      </Button>
      <Button block>
        <PoweroffOutlined />
        Cerrar sesión
      </Button>
    </div>
  </>
);

export const DefaultHeader: React.FC<HeaderProps> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { navContent, title } = props;

  return (
    <Header className="" style={{ background: colorBgContainer }}>
      <div className="h-full w-full flex flex-row">
        <Title level={1} className="mr-5" style={{ marginBottom: 0 }}>
          <span className="text-2xl uppercase text-green-600">{title}</span>
        </Title>
        <nav className="flex-1">{navContent}</nav>
        <section className="flex items-center gap-3 flex-nowrap">
          <Text>
            Hola, <strong>Andrea</strong>
          </Text>
          <Popover
            trigger={"click"}
            content={popupContent()}
            className="cursor-pointer">
            <Avatar className="bg-green-300" shape="square" size={35}>
              <strong className="text-green-900">AV</strong>
            </Avatar>
          </Popover>
        </section>
      </div>
    </Header>
  );
};
