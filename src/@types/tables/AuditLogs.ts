import type { Actions } from "../../pages/main/auditLogs/__constants__/ACTION_TYPE";

export type AuditLogs = {
  id?: number | null;
  tableName?: string | null;
  tableId?: string | null;
  pageName?: string | null;
  description?: string | null;
  columnAffected?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  actionType?: Actions | null;
  auditBy?: number | null;
  auditDate: Date | null;
};
