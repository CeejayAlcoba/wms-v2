import type {
  PresetColorType,
  PresetStatusColorType,
} from "antd/es/_util/colors";
import type { LiteralUnion } from "antd/es/_util/type";

export type Actions = "CREATE" | "UPDATE" | "DELETE" | "CHECK IN" | "GOOD RECEIPT";

export type ActionType = {
  label: Actions;
  value: Actions;
  color: LiteralUnion<PresetColorType | PresetStatusColorType>;
};

export const ACTION_TYPES: ActionType[] = [
  { label: "CREATE", value: "CREATE", color: "blue" },
  { label: "UPDATE", value: "UPDATE", color: "green" },
  { label: "DELETE", value: "DELETE", color: "red" },
  { label: "CHECK IN", value: "CHECK IN", color: "blue" },
   { label: "GOOD RECEIPT", value: "GOOD RECEIPT", color: "magenta" },
];
