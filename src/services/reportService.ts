
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";
import type { ReportFilterDTO } from "../@types/DTOs/ReportFilterDTO";
import type { ReportDTO } from "../@types/DTOs/ReportDTO";

const path = "report";

function _reportService() {
  const GetAll = async (filters: ReportFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ReportDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  return { GetAll };
}

export const reportService = _reportService();
