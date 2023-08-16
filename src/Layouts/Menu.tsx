import { PieChartOutlined, ProfileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  label: React.ReactNode;
  path?: string;
  children?: MenuItem[];
} & Omit<Required<MenuProps>["items"][number], "children">;

function getItem(
  label: React.ReactNode,
  path?: string | null, // path is now the second parameter
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key: path || label.toString(), // Use path as key, fallback to label if path is not provided
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Seguridad", "1", null, [
    getItem("Usuarios", "/admin/users", <PieChartOutlined />),
    getItem("Perfiles", "/test", <ProfileOutlined />),
  ]),
  // Uncomment and modify as needed
  // getItem("Almacen", "20", "/admin/almacen", <DesktopOutlined />, [
  //   getItem("Inventario", "5", "/admin/almacen/inventario"),
  //   getItem("Movimientos", "6", "/admin/almacen/movimientos"),
  // ]),
];

export const AdminMenu: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  const getOpenKeys = () => {
    for (const item of items) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === location.pathname) {
            return [item.key];
          }
        }
      }
    }
    return [];
  };

  return (
    <Menu
      theme="dark"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={getOpenKeys()}
      mode="inline">
      {items.map((item) => {
        if (item.children) {
          return (
            <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  icon={child.icon}
                  onClick={() => handleClick(child.path || "")}>
                  {child.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleClick(item.path || "")}>
              {item.label}
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};
