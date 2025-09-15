import type { AuditLogsFilterDTO } from "../../../../@types/DTOs/AuditLogsFilterDTO";

export const EMPTY_FORM: AuditLogsFilterDTO = {
  tableName: null,
  recordId: null,
  pageName: null,
  description: null,
  oldValue: null,
  newValue: null,
  actionType: null,
  auditBy: null,
  auditDate: null,
  currentPage: 1,
  pageSize: 10,
};
