import type { ReactNode } from "react";
import afreightLogo from "../../assets/afreight-logo.png";
import { Typography } from "antd";

type MainLayoutProps = {
  children: ReactNode;
  headerTitle: ReactNode;
};
export default function MainLayout(props: MainLayoutProps) {
  const { children, headerTitle } = props;
  const { Text } = Typography;
  return (
    <>
      <img src={afreightLogo} width={250} />
      <div className="d-flex justify-content-center">
        <Text style={{ fontSize: "25px", color: "black", fontWeight: "bold" }}>
          {headerTitle}
        </Text>
      </div>
      {children}
    </>
  );
}
