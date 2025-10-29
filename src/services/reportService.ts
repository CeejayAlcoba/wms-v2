import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";
import type { ReportInventoryFilterDTO } from "../@types/DTOs/ReportInventoryFilterDTO";
import type { ReportInventoryDTO } from "../@types/DTOs/ReportInventoryDTO";
import type { ReportPickListFilterDTO } from "../@types/DTOs/ReportPickListFilterDTO";
import type { ReportPickListDTO } from "../@types/DTOs/ReportPickListDTO";
import type { ReportInboundFilterDTO } from "../@types/DTOs/ReportInboundFilterDTO";
import type { ReportInboundDTO } from "../@types/DTOs/ReportInboundDTO";
import type { ReportCargoHistoryFilterDTO } from "../@types/DTOs/ReportCargoHistoryFilterDTO";
import type { ReportCargoHistoryDTO } from "../@types/DTOs/ReportCargoHistoryDTO";
import type { ReportOutboundFilterDTO } from "../@types/DTOs/ReportOutboundFilterDTO";
import type { ReportOutboundDTO } from "../@types/DTOs/ReportOutboundDTO";
import type { Pagination } from "../@types/pagination/Pagination";

const path = "report";

function _reportService() {
  const CargoHistoryGetAll = async (filters: ReportCargoHistoryFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ReportCargoHistoryDTO[]>(
      `${path}/cargo-history/list?${queryParams}`
    );
    return data;
  };

  const InventoryGetAll = async (
    filters?: Partial<ReportInventoryFilterDTO>
  ) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ReportInventoryDTO[]>(
      `${path}/inventory/list?${queryParams}`
    );
    return data;
  };

  const PickListGetAll = async (filters: Partial<ReportPickListFilterDTO>) => {
    const initialFilters: Partial<ReportPickListFilterDTO> = {
      ...filters,
      allowNullGoodIssue: true,
    };
    const queryParams = objectToQueryParam(initialFilters);
    const { data } = await axiosInstance.get<ReportPickListDTO[]>(
      `${path}/picklist/list?${queryParams}`
    );
    return data;
  };

  const InboundGetAll = async (filters: ReportInboundFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ReportInboundDTO[]>(
      `${path}/inbound/list?${queryParams}`
    );
    return data;
  };

  const OutboundGetAll = async (filters: ReportOutboundFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<Pagination<ReportOutboundDTO>>(
      `${path}/outbound/list?${queryParams}`
    );
    return data;
  };

  return {
    InventoryGetAll,
    PickListGetAll,
    InboundGetAll,
    CargoHistoryGetAll,
    OutboundGetAll,
  };
}

export const reportService = _reportService();
