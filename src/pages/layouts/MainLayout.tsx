import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import DrawerLayout from "./DrawerLayout";
import useWindowWidth from "../../hooks/useWindowWidth";

const MainLayout = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const { windowWidth } = useWindowWidth();
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <SidebarLayout />
      <Layout style={{ overflow: "hidden" }}>
        <HeaderLayout />
        <DrawerLayout />
        <Layout
          style={{
            flex: 1,
            padding: windowWidth > 768 ? 24 : 14,
            overflow: "auto",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
