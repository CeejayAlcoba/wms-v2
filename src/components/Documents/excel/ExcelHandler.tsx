import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip, Upload } from "antd";
import React from "react";
import * as XLSX from "xlsx";

export type ExcelColumnType = "string" | "number" | "boolean" | "date";

export type ExcelColumn<T> = {
  label: string;
  key: keyof T;
  type: ExcelColumnType;
  validate?: (value: any) => boolean;
  invalidMessage?: (label: string, row: number) => string;
  isRequired?: boolean;
};

export type ExcelHandlerProps<T> = {
  columns: ExcelColumn<T>[];
  data?: T[];
  onUpload: (record: T[]) => void;
  onInvalidUpload?: (messages: string[]) => void;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const validateExcelValue = (value: any, type: ExcelColumnType): boolean => {
  switch (type) {
    case "number":
      return !isNaN(Number(value));

    case "boolean":
      return (
        value === true ||
        value === false ||
        value === "true" ||
        value === "false"
      );

    case "date":
      if (typeof value === "number" && value > 0) return true;
      if (typeof value === "string" && !isNaN(new Date(value).getTime()))
        return true;
      return false;

    case "string":
    default:
      return true;
  }
};

const ExcelHandler = <T extends Record<string, any>>({
  columns,
  onUpload,
  onInvalidUpload,
  ...rest
}: ExcelHandlerProps<T>) => {
  const handleDownload = () => {
    const headers = columns.map((col) => col.label);
    const ws = XLSX.utils.json_to_sheet([], { header: headers });

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

      const messages: string[] = [];

      if (jsonData.length === 0) {
        messages.push("Uploaded file is empty.");
      } else {
        const uploadedColumns = Object.keys(jsonData[0]);
        const expectedLabels = columns.map((c) => c.label);

        const missingColumns = expectedLabels.filter(
          (label) => !uploadedColumns.includes(label)
        );

        if (missingColumns.length > 0) {
          messages.push(
            `Invalid file format. Missing columns: ${missingColumns.join(", ")}`
          );
        }

        // ✅ Validate each row & column
        for (const [rowIndex, row] of jsonData.entries()) {
          for (const col of columns) {
            const value = row[col.label];
            const rowNumber = rowIndex + 2;

            // Required check
            if (
              col.isRequired &&
              (value === "" || value === null || value === undefined)
            ) {
              messages.push(
                `Missing required value in row ${rowNumber}, column "${col.label}".`
              );
            }

            // Type check
            else if (!validateExcelValue(value, col.type)) {
              messages.push(
                `Invalid value in row ${rowNumber}, column "${col.label}" (expected ${col.type}).`
              );
            }

            // Custom validate
            else if (col.validate && !col.validate(value)) {
              messages.push(
                (col.invalidMessage &&
                  col.invalidMessage(col.label, rowNumber)) ??
                  `Validation failed in row ${rowNumber}, column "${col.label}" (value: ${value}).`
              );
            }
          }
        }
      }

      if (messages.length > 0) {
        onInvalidUpload?.(messages);
        return;
      }

      const mappedData = jsonData.map((row) => {
        const record = {} as T;
        columns.forEach((col) => {
          let value = row[col.label];

          if (col.type === "date" && typeof value === "number") {
            const excelBaseDate = new Date(Date.UTC(1899, 11, 30));
            const converted = new Date(
              excelBaseDate.getTime() + value * 86400000
            );
            value = converted.toISOString().split("T")[0];
          } else if (col.type === "string") {
            value = value != null ? String(value) : "";
          } else if (col.type === "number") {
            value = Number(value);
          }

          const key = col.key as keyof T;
          record[key] = value as T[keyof T];
        });

        return record;
      }) as T[];

      onUpload(mappedData);
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
