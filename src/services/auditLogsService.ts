import type { AuditLogsDTO } from "../@types/DTOs/AuditLogsDTO";
import type { AuditLogsFilterDTO } from "../@types/DTOs/AuditLogsFilterDTO";
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "audit-logs";

function _auditLogsService() {
  const GetAll = async (filters?: Partial<AuditLogsFilterDTO>) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<AuditLogsDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  return { GetAll };
}

export const auditLogsService = _auditLogsService();
