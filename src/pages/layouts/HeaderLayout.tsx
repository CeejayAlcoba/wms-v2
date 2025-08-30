import { Avatar, Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useSidebar from "../../contexts/useSidebar";
import useDrawer from "../../contexts/useDrawer";
import Logo from "../../assets/LOGO-ONLY.png";

export default function HeaderLayout() {
  const { collapsed, setCollapsed } = useSidebar();
  const { openDrawer } = useDrawer();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: "0 16px", background: colorBgContainer }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <img style={{width:120}} src={Logo} />
        </div>

        <Avatar
          icon={<UserOutlined />}
          onClick={() => openDrawer()}
          style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
        />
      </div>
    </Header>
  );
}
