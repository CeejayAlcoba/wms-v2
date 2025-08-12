import type { TableTotalFooterProps } from "../../../../components/Table/TableTotalFooter";

export const CARGO_HISTORY_TOTAL_FOOTER: TableTotalFooterProps = [
  { label: "Total PL Quantity", name: "totalPickListQuantity" },
  { label: "Total PL Pallete", name: "totalPickListPalleteCount" },
  { label: "Total PL CBM", name: "totalPickListCubicMeter" },
  { label: "Total GI Quantity", name: "totalIssuedQuantity" },
  { label: "Total GI Pallete", name: "totalIssuedPalleteCount" },
  { label: "Total GI CBM", name: "totalIssuedCubicMeter" },
];
