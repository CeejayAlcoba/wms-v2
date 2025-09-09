import { DownloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";
import * as XLSX from "xlsx";

interface ExcelHandlerProps<T> {
  columns: string[];
  data: T[];
  onUpload: (record: Record<string, any>[]) => void;
  onInvalidUpload?: (message: string) => void;
}

const ExcelHandler = <T extends Record<string, any>>({
  columns,
  onUpload,
  onInvalidUpload,
}: ExcelHandlerProps<T>) => {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet([], { header: columns });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "format.xlsx");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        onInvalidUpload && onInvalidUpload("Uploaded file is empty.");
        return;
      }
      const uploadedColumns = Object.keys(jsonData[0]);
      const missingColumns = columns.filter(
        (col) => !uploadedColumns.includes(col)
      );

      if (missingColumns.length > 0) {
        console.error("Invalid file format. Missing columns:", missingColumns);
        onInvalidUpload &&
          onInvalidUpload(
            `Invalid file format. Missing columns: ${missingColumns}`
          );
        return;
      }
      onUpload(jsonData);
      console.log("Uploaded Data:", jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button icon={<DownloadOutlined />} onClick={handleDownload}>
        Format
      </Button>
      <label style={{ cursor: "pointer" }}>
        <Input
          type="file"
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <span>Upload Excel</span>
      </label>
    </div>
  );
};

export default ExcelHandler;
