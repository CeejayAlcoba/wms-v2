import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip, Upload } from "antd";
import React from "react";
import * as XLSX from "xlsx";

type ExcelHandlerProps<T> = {
  columns: string[];
  data: T[];
  onUpload: (record: Record<string, any>[]) => void;
  onInvalidUpload?: (message: string) => void;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ExcelHandler = <T extends Record<string, any>>({
  columns,
  onUpload,
  onInvalidUpload,
  ...rest
}: ExcelHandlerProps<T>) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet([], { header: columns });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "format.xlsx");
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      if (!binaryStr) return;

      const wb = XLSX.read(binaryStr, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData: Record<string, any>[] = XLSX.utils.sheet_to_json(ws, {
        defval: "",
      });

      if (jsonData.length === 0) {
        console.error("Uploaded file is empty.");
        onInvalidUpload?.("Uploaded file is empty.");
        return;
      }

      const uploadedColumns = Object.keys(jsonData[0]);
      const missingColumns = columns.filter(
        (col) => !uploadedColumns.includes(col)
      );

      if (missingColumns.length > 0) {
        console.error("Invalid file format. Missing columns:", missingColumns);
        onInvalidUpload?.(
          `Invalid file format. Missing columns: ${missingColumns.join(", ")}`
        );
        return;
      }

      onUpload(jsonData);
      console.log("Uploaded Data:", jsonData);
    };

    reader.readAsBinaryString(file);
    return false;
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }} {...rest}>
      <Tooltip title="Download Format">
        <Button icon={<DownloadOutlined />} onClick={handleDownload}>
          Format
        </Button>
      </Tooltip>
      <Upload
        accept=".xlsx, .xls"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
      >
        <Button icon={<UploadOutlined />}>Upload Excel</Button>
      </Upload>
    </div>
  );
};

export default ExcelHandler;
