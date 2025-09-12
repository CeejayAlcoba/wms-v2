import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { AuditLogs } from "../tables/AuditLogs";

export type AuditLogsFilterDTO = {
  dateFrom?: string | null;
  dateTo?: string | null;
} & AuditLogs & IPaginationFilter;
