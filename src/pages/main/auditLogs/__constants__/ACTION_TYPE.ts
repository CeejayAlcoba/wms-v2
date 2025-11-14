import type {
  PresetColorType,
  PresetStatusColorType,
} from "antd/es/_util/colors";
import type { LiteralUnion } from "antd/es/_util/type";

export type Actions =
  | "CREATE"
  | "UPDATE"
  | "APPROVED"
  | "DELETE"
  | "CHECK IN"
  | "GOOD RECEIPT"
  | "PICKLIST"
  | "GOOD ISSUE";

export type ActionType = {
  label: Actions;
  value: Actions;
  color: LiteralUnion<PresetColorType | PresetStatusColorType>;
};

export const ACTION_TYPES: ActionType[] = [
  { label: "CREATE", value: "CREATE", color: "blue" },
  { label: "UPDATE", value: "UPDATE", color: "green" },
  { label: "APPROVED", value: "APPROVED", color: "yellow-inverse" },
  { label: "DELETE", value: "DELETE", color: "red" },
  { label: "CHECK IN", value: "CHECK IN", color: "geekblue" },
  { label: "GOOD RECEIPT", value: "GOOD RECEIPT", color: "volcano" },
  { label: "PICKLIST", value: "PICKLIST", color: "orange" },
  { label: "GOOD ISSUE", value: "GOOD ISSUE", color: "purple" },
];
