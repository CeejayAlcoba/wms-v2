import { Button, Tooltip, type ButtonProps } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

export type PrintTableProps = {
  onPrint: () => void;
} & ButtonProps;

const PrintTable = (props: PrintTableProps) => {
  const { onPrint } = props;

  return (
    <>
      <Tooltip title="Print">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onPrint()}
          icon={<PrinterOutlined />}
          {...props}
        />
      </Tooltip>
    </>
  );
};

export default PrintTable;
