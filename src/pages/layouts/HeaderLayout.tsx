import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useSidebar from "../../context/useSidebar";

export default function HeaderLayout() {
  const { collapsed, setCollapsed } = useSidebar();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
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
    </Header>
  );
}
