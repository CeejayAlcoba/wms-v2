import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import DrawerLayout from "./DrawerLayout";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <SidebarLayout />
      <Layout style={{ overflow: "hidden" }}>
        <HeaderLayout />
        <DrawerLayout />
        <Content
          style={{
            flex: 1,
            padding: 24,
            margin: 16,
            overflow: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
