import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Popover, Spin, Typography, theme } from "antd";
import { useMemo } from "react";
import { AuthAPI } from "../api";
import { useAdminAPI } from "../hooks";
import { showToast } from "../lib/notify";

const { Text, Title } = Typography;
const { Header } = Layout;

interface HeaderProps {
  navContent?: React.ReactNode;
  title: string;
}

// function to extract the initials (MAX 2) from a name
function getInitials(name: string) {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export const DefaultHeader: React.FC<HeaderProps> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { navContent, title } = props;

  const { data: meData, isLoading: meLoading } = useAdminAPI("me");

  const initials = useMemo(() => {
    if (meLoading) return <Spin />;
    return getInitials(meData?.username ?? "");
  }, [meData, meLoading]);

  const handleLogoutClick = async () => {
    await AuthAPI.logout();
    showToast("Sesión cerrada correctamente", "success");
  };

  const popupContent = () => {
    return (
      <>
        <div className="w-min-[350px] bg-blue-200 p-5 flex gap-4">
          <Avatar
            className="bg-green-300 outline outline-green-900"
            shape="square"
            size={50}>
            <strong className="text-green-900">{initials}</strong>
          </Avatar>
          <div className="my-auto max-w-[200px]">
            <Text strong className="text-lg" ellipsis={true}>
              {meLoading ? <Spin /> : meData?.username}
            </Text>
          </div>
        </div>
        <div className="flex px-3 py-2 gap-2">
          <Button block>
            <UserOutlined />
            Mi perfil
          </Button>
          <Button block onClick={handleLogoutClick}>
            <PoweroffOutlined />
            Cerrar sesión
          </Button>
        </div>
      </>
    );
  };

  return (
    <Header className="" style={{ background: colorBgContainer }}>
      <div className="h-full w-full flex flex-row">
        <Title level={1} className="mr-5" style={{ marginBottom: 0 }}>
          <span className="text-2xl uppercase text-green-600">{title}</span>
        </Title>
        <nav className="flex-1">{navContent}</nav>
        <section className="flex items-center gap-3 flex-nowrap">
          <Text>
            {meLoading ? (
              <Spin />
            ) : (
              <>
                <strong>{meData?.name}</strong>
              </>
            )}
          </Text>
          <Popover
            trigger={"click"}
            content={popupContent()}
            className="cursor-pointer">
            <Avatar className="bg-green-300" shape="square" size={35}>
              <strong className="text-green-900">{initials}</strong>
            </Avatar>
          </Popover>
        </section>
      </div>
    </Header>
  );
};
