import dayjs from "dayjs";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";

type BillingTableHeaderProps = {
  record?: BillingStatementDTO;
};

const thStyle: React.CSSProperties = {
  border: "1px solid #dfe2e6",
  padding: "4px",
  width: "15%",
  background: "#f8f8f8",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #dfe2e6",
  padding: "4px",
};

export default function BillingTableHeader({
  record,
}: BillingTableHeaderProps) {
  return (
    <>
      <table className="table">
        <tbody>
          {/* Row 1 */}
          <tr>
            {/* Customer */}
            <th style={thStyle}>Customer:</th>
            <td style={tdStyle}>{record?.principal}</td>

            {/* Date */}
            <th style={thStyle}>Date:</th>
            <td style={tdStyle}>
              {dayjs(record?.dateTo).format("DD/MM/YYYY")}
            </td>
          </tr>

          {/* Row 2 */}
          <tr>
            {/* Address */}
            <th style={thStyle}>Address:</th>
            <td style={tdStyle}>{record?.principalAddress}</td>

            {/* ICR No */}
            <th style={thStyle}>ICR No.</th>
            <td style={tdStyle}></td>
          </tr>

          {/* Row 3 */}
          <tr>
            {/* Consignee */}
            <th style={thStyle}>Consignee:</th>
            <td style={tdStyle}></td>

            {/* OCR No */}
            <th style={thStyle}>OCR No.</th>
            <td style={tdStyle}></td>
          </tr>

          {/* Row 4 (Commodity spanning full right side) */}
          <tr>
            <th style={thStyle}>Commodity:</th>
            <td style={tdStyle} colSpan={3}>
              {record?.productCategory}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
