import { BarcodeOutlined, PieChartOutlined, ProfileOutlined } from "@ant-design/icons";
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
  path?: string | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key: path || label.toString(),
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Seguridad", "1", null, [
    getItem("Usuarios", "/admin/users", <PieChartOutlined />, []),
    getItem("Perfiles", "/admin/profiles", <ProfileOutlined />),
  ]),
  getItem("Administración", "2", null, [
    getItem("Prodcutos", "/admin/products", <BarcodeOutlined />),
  ]),
  // Uncomment and modify as needed
  // getItem("Almacen", "20", "/admin/almacen", <DesktopOutlined />, [
  //   getItem("Inventario", "5", "/admin/almacen/inventario"),
  //   getItem("Movimientos", "6", "/admin/almacen/movimientos"),
  // ]),
];

// Utility function to check if the current path matches the regex pattern
const pathMatches = (path: string, pattern: string) => {
  const regex = new RegExp(`^${pattern}`);
  return regex.test(path);
};

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
          if (pathMatches(location.pathname, child.path || "")) {
            return [item.key];
          }
        }
      }
    }
    return [];
  };

  const getSelectedKey = () => {
    for (const item of items) {
      if (item.children) {
        for (const child of item.children) {
          if (pathMatches(location.pathname, child.path || "")) {
            return child.key;
          }
        }
      } else if (pathMatches(location.pathname, item.path || "")) {
        return item.key;
      }
    }
    return "";
  };

  return (
    <Menu
      theme="dark"
      selectedKeys={[getSelectedKey() as any]}
      defaultOpenKeys={getOpenKeys() as any}
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
