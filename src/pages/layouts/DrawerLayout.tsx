// src/components/layout/DrawerLayout.tsx

import { Drawer, Space, Typography, Switch, Button, Menu } from "antd";
import useDrawer from "../../contexts/useDrawer";
import {
  UserOutlined,
  LogoutOutlined,
  BulbOutlined,
  EditOutlined,
} from "@ant-design/icons";
import useUser from "../../contexts/useUser";
import SweetAlert from "../../components/SweetAlert/SweetAlert";
import { useNavigate } from "react-router-dom";
import { useAntConfig } from "../../contexts/useAntConfig";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

const { Text, Title } = Typography;

type MenuType = {
  path?: string;
  onClick?: () => void;
} & ItemType<MenuItemType>;
const DrawerLayout = () => {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { user, setUser } = useUser();
  const { toggleTheme, isDarkMode } = useAntConfig();
  const navigate = useNavigate();
  const handleLogout = () => {
    SweetAlert({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      timer: undefined,
    }).then(async (result) => {
      if (result.isConfirmed) {
        closeDrawer();
        await navigate("/login");
        await localStorage.clear();
        await setUser(null);
      }
    });
  };

  const menuItems: MenuType[] = [
    {
      key: "editProfile",
      icon: <EditOutlined />,
      label: "Edit Profile",
      path: "/profile",
      onClick: () => closeDrawer(),
    },
    {
      key: "darkMode",
      icon: <BulbOutlined />,
      label: (
        <Space
          align="center"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <Text>Dark Mode</Text>
          <Switch onChange={toggleTheme} defaultChecked={isDarkMode} />
        </Space>
      ),
    },
  ];

  return (
    <Drawer
      title={
        <Space align="center">
          <UserOutlined style={{ fontSize: 20 }} />
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {user?.username}
            </Title>
            <Text type="secondary">
              {user?.firstName} {user?.lastName}
            </Text>
          </div>
        </Space>
      }
      placement="right"
      onClose={closeDrawer}
      open={isDrawerOpen}
    >
      <Menu
        mode="inline"
        style={{ backgroundColor: "transparent" }}
        selectable={false}
        items={menuItems.map((m) => ({
          ...m,
          className: "mb-2",
          onClick: () => {
            m.onClick && m.onClick();
            m.path && navigate(m.path);
          },
        }))}
      />
      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        block
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default DrawerLayout;
