import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag, type TagProps } from "antd";
import type { ReactNode } from "react";

export type ToggleTagProps = {
  data: boolean;
  children?:ReactNode;
  trueProps?: TagProps & { label: string };
  falseProps?: TagProps & { label: string };
};

export default function ToggleTag(props: ToggleTagProps) {
  const { data, trueProps, falseProps,children } = props;

  if (data)
    return (
      <Tag icon={<CheckCircleOutlined />} color="success" {...trueProps}>
        {children ?? "Yes"}
      </Tag>
    );

  return (
    <Tag icon={<CloseCircleOutlined />} color="error" {...falseProps}>
      {children ?? "No"}
    </Tag>
  );
}
