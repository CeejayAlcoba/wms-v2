export type Actions = "CREATE" | "UPDATE" | "DELETE";

export type ActionType = {
  label: Actions;
  value: Actions;
};

export const ACTION_TYPES: ActionType[] = [
  { label: "CREATE", value: "CREATE" },
  { label: "UPDATE", value: "UPDATE" },
  { label: "DELETE", value: "DELETE" },
];
