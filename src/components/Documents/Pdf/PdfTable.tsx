import { Button, Table, Tooltip, Space } from "antd";

import useDocument from "../../../contexts/useDocument";
import { FilePdfOutlined } from "@ant-design/icons";
import TableDocumentDesign from "../TableDocumentDesign";

export type DownloadPdfTableProps = {
  onDownload: () => void;
};

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
        />
      </Tooltip>
      <TableDocumentDesign />
    </>
  );
};

export default DownloadPdfTable;
