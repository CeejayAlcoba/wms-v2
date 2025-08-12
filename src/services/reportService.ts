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

const path = "report";

function _reportService() {
  const CargoHistoryGetAll = async (filters: ReportCargoHistoryFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ReportCargoHistoryDTO[]>(
      `${path}/cargo-history/list?${queryParams}`
    );
    return data;
  };

  const InventoryGetAll = async (filters: ReportInventoryFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ReportInventoryDTO[]>(
      `${path}/inventory/list?${queryParams}`
    );
    return data;
  };

  const PickListGetAll = async (filters: ReportPickListFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
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

  return { InventoryGetAll, PickListGetAll, InboundGetAll, CargoHistoryGetAll };
}

export const reportService = _reportService();
