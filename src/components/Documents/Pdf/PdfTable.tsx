import { Button, Table, Tooltip, Space, type ButtonProps } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

export type DownloadPdfTableProps = {
  onDownload: () => void;
} & ButtonProps;

const DownloadPdfTable = (props: DownloadPdfTableProps) => {
  const { onDownload } = props;

  return (
    <>
      <Tooltip title="Download PDF">
        <Button
          variant="outlined"
          color="danger"
          onClick={() => onDownload()}
          icon={<FilePdfOutlined />}
          {...props}
        />
      </Tooltip>
    </>
  );
};

export default DownloadPdfTable;
