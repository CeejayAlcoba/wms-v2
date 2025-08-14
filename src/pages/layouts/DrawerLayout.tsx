// src/components/layout/DrawerLayout.tsx

import { Drawer, Space, Typography, Divider, Switch, Button } from "antd";
import useDrawer from "../../contexts/useDrawer";
import { UserOutlined, LogoutOutlined, BulbOutlined } from "@ant-design/icons";
import useUser from "../../contexts/useUser";
import Swal from "sweetalert2";
import SweetAlert from "../../components/SweetAlert/SweetAlert";
import { useNavigate } from "react-router-dom";
import { useAntConfig } from "../../contexts/useAntConfig";

const { Text, Title } = Typography;

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
    }).then((result) => {
      if (result.isConfirmed) {
        SweetAlert({
          title: "Logged out",
          text: "You have been successfully logged out.",
          icon: "success",
        });
        localStorage.clear();
        setUser(null);
        navigate("/login");
      }
    });
  };

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
      {/* Divider & Dark Mode Toggle */}
      <Divider />
      <Space
        align="center"
        style={{ justifyContent: "space-between", width: "100%" }}
      >
        <BulbOutlined />
        <Text>Dark Mode</Text>
        <Switch onChange={toggleTheme} defaultChecked={isDarkMode} />
      </Space>

      {/* Divider & Logout */}
      <Divider />
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
