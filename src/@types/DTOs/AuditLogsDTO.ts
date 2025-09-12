import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { AuditLogs } from "../tables/AuditLogs";

export type AuditLogsDTO = {
  auditName?: string | null;
} & AuditLogs & IPaginationTotal;
