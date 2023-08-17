import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";

const items: MenuProps["items"] = [];

export const ProfilesHeader: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
