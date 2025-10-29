import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import DrawerLayout from "./DrawerLayout";
import useWindowWidth from "../../hooks/useWindowWidth";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const { windowWidth } = useWindowWidth();

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <SidebarLayout />

      <Layout>
        <HeaderLayout />
        <DrawerLayout />

        <Content
          style={{
            padding: windowWidth > 768 ? 24 : 14,
            borderRadius: borderRadiusLG,
            overflowY: "auto",
            overflowX: "hidden",
            height: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
