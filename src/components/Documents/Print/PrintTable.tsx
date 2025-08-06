import { Button, Table, Tooltip } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import TableDocumentDesign from "../TableDocumentDesign";

export type PrintTableProps = {
  onPrint: () => void;
};

const PrintTable = (props: PrintTableProps) => {
  const { onPrint } = props;

  // useEffect(() => {
  //   if (progress !== null && progress < 100) {
  //     SweetAlertProgress({ progress });
  //   }
  // }, [progress]);

  return (
    <>
      <Tooltip title="Print">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onPrint()}
          icon={<PrinterOutlined />}
        />
      </Tooltip>

      <div className="d-none">
        <TableDocumentDesign />
      </div>
    </>
  );
};

export default PrintTable;
