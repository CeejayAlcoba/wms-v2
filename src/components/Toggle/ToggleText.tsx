import { theme } from 'antd';
import type { ReactNode } from 'react';
export type ToggleTextProps = {
  data: boolean;
  children?:ReactNode;
  trueProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  falseProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
};

export default function ToggleText(props: ToggleTextProps) {
  const { data, trueProps, falseProps,children } = props;
  const { token } = theme.useToken();

  if (data)
    return (
      <span style={{color:token.colorPrimary}} {...trueProps}>
        {children ?? "Yes"}
      </span>
    );

  return (
    <span style={{color:token.colorError}} {...falseProps}>
      {children ?? "No"}
    </span>
  );
}
