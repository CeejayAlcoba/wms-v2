import React, { useState } from "react";
import { Layout, theme } from "antd";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <SidebarLayout />
      <Layout>
        <HeaderLayout />
        <Content
          style={{
            height: "88vh",
            margin: "23px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
