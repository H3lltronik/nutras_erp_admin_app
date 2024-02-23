import {
  BarcodeOutlined,
  CodeSandboxOutlined,
  DatabaseOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roles } from "../components/Forms/Profiles/roles";
import { useAbilities } from "../hooks/roles/useAbilities";
import useAuth from "../hooks/useAuth";

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  label: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  ability?: string;
} & Omit<Required<MenuProps>["items"][number], "children">;

function getItem(
  label: React.ReactNode,
  path?: string | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  ability?: string // Add this line
): MenuItem {
  return {
    key: path || label?.toString(),
    icon,
    children,
    label,
    path,
    ability,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Catálogo de productos", "6", null, [
    getItem(
      "Catálogo de insumos",
      "/admin/products/insumos",
      <CodeSandboxOutlined />,
      [],
      roles.Inventory.roles.read.role
    ),

    getItem(
      "Catálogo PP",
      "/admin/products/pp",
      <BarcodeOutlined />,
      [],
      roles.Product.roles.read.role
    ),
    getItem(
      "Catálogo PT",
      "/admin/products/pt",
      <BarcodeOutlined />,
      [],
      roles.Product.roles.read.role
    ),
  ]),
  // getItem("Dirección", "7", null, [
  //   getItem(
  //     "Solicitudes de trabajo",
  //     "/admin/work-requests",
  //     <OrderedListOutlined />,
  //     [],
  //     roles.WorkRequests.roles.read.role
  //   ),
  // ]),
  // getItem("Almacén", "2", null, [
  //   getItem(
  //     "Inventario",
  //     "/admin/inventory",
  //     <CodeSandboxOutlined />,
  //     [],
  //     roles.Inventory.roles.read.role
  //   ),
  //   getItem(
  //     "Movimientos",
  //     "/admin/movements",
  //     <DatabaseOutlined />,
  //     [],
  //     roles.Inventory.roles.read.role
  //   ),
  // ]),
  getItem("Administración", "1", null, [
    getItem(
      "Usuarios",
      "/admin/users",
      <PieChartOutlined />,
      [],
      roles.User.roles.read.role
    ),
    getItem(
      "Perfiles",
      "/admin/profiles",
      <ProfileOutlined />,
      [],
      roles.Profile.roles.read.role
    ),
    // getItem(
    //   "Notificaciones",
    //   "/admin/notifications",
    //   <ProfileOutlined />,
    //   [],
    //   roles.Notification.roles.read.role
    // ),
  ]),
  getItem("Compras", "3", null, [
    // getItem(
    //   "Ordenes de compra",
    //   "/admin/purchase-orders",
    //   <OrderedListOutlined />,
    //   [],
    //   roles.PurchaseOrders.roles.read.role
    // ),
    getItem(
      "Proveedores",
      "/admin/providers",
      <OrderedListOutlined />,
      [],
      roles.Provider.roles.read.role
    ),
  ]),
  // getItem("Producción", "4", null, [
  //   getItem(
  //     "Ordenes de trabajo",
  //     "/admin/work-orders",
  //     <OrderedListOutlined />,
  //     [],
  //     roles.WorkOrders.roles.read.role
  //   ),
  //   getItem(
  //     "Requisición de compras",
  //     "/admin/purchase-requisition",
  //     <PieChartOutlined />,
  //     [],
  //     roles.PurchaseRequisition.roles.read.role
  //   ),
  //   getItem(
  //     "Etiquetación",
  //     "/admin/labelation",
  //     <PieChartOutlined />,
  //     [],
  //     roles.Tagging.roles.read.role
  //   ),
  // ]),
  // getItem("Calidad", "5", null, [
  //   getItem(
  //     "Calidad",
  //     "/admin/quality",
  //     <PieChartOutlined />,
  //     [],
  //     roles.Quality.roles.read.role
  //   ),
  // ]),
];

// Utility function to check if the current path matches the regex pattern
const pathMatches = (path: string, pattern: string) => {
  const regex = new RegExp(`^${pattern}$`);
  return regex.test(path);
};

export const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const ability = useAbilities(user?.profile.roles || []);

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
      selectedKeys={[getSelectedKey() as string]}
      defaultOpenKeys={getOpenKeys() as string[]}
      mode="inline">
      {items.map((item) => {
        if (item.children) {
          return (
            <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
              {item.children.map((child) => {
                if (
                  child.ability &&
                  !ability.can(
                    child.ability.split(":")[1],
                    child.ability.split(":")[0]
                  )
                ) {
                  return null;
                }

                return (
                  <Menu.Item
                    key={child.key}
                    icon={child.icon}
                    onClick={() => handleClick(child.path || "")}>
                    {child.label}
                  </Menu.Item>
                );
              })}
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
