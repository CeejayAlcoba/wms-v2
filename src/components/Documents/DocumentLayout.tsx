import type { ReactNode } from "react";
import afreightLogo from "../../assets/afreight-logo.png";
import { Typography } from "antd";

type DocumentLayoutProps = {
  children: ReactNode;
  headerTitle?: ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function DocumentLayout(props: DocumentLayoutProps) {
  const { children, headerTitle,...rest } = props;
  const { Text } = Typography;
  return (
    <div {...rest}>
      <img src={afreightLogo} width={250} />
      <div className="d-flex justify-content-center">
        <Text style={{ fontSize: "25px", color: "black", fontWeight: "bold" }}>
          {headerTitle && headerTitle}
        </Text>
      </div>
      {children}
    </div>
  );
}
