export type AuditLogs = {
  id?: number | null;
  tableName?: string | null;
  recordId?: number | null;
  pageName?: string | null;
  targetName?: string | null;
  targetValue?: string | null;
  actionType?: string | null;
  description?: string | null;
  columnAffected?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  columnDisplay?: string | null;
  oldDisplayValue?: string | null;
  newDisplayValue?: string | null;
  auditBy?: number | null;
  auditDate?: Date | null;
};
