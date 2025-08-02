import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag, type TagProps } from "antd";

export type ToggleTagProps = {
  data: boolean;
  trueProps?: TagProps & { label: string };
  falseProps?: TagProps & { label: string };
};

export default function ToggleTag(props: ToggleTagProps) {
  const { data, trueProps, falseProps } = props;

  if (data)
    return (
      <Tag icon={<CheckCircleOutlined />} color="success" {...trueProps}>
        {!trueProps?.children && "Yes"}
      </Tag>
    );

  return (
    <Tag icon={<CloseCircleOutlined />} color="error" {...falseProps}>
      {!falseProps?.children && "No"}
    </Tag>
  );
}
