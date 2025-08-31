import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import DrawerLayout from "./DrawerLayout";
import useWindowWidth from "../../hooks/useWindowWidth";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgLayout, borderRadiusLG },
  } = theme.useToken();

  const {windowWidth} =useWindowWidth();
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <SidebarLayout />
      <Layout style={{ overflow: "hidden" }}>
        <HeaderLayout />
        <DrawerLayout />
        <Content
          style={{
            flex: 1,
            padding: windowWidth > 768 ? 24 : 0,
            margin: 16,
            overflow: "auto",
            background: colorBgLayout,
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
