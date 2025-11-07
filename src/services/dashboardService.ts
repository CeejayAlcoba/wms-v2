import type { DashboardSummaryDTO } from "../@types/DTOs/DashboardSummaryDTO";
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "dashboard";

function _dashboardService() {
  const GetSummary = async (principal?: number) => {
    const queryParams = objectToQueryParam({ principal: principal });
    const { data: reponseData } = await axiosInstance.get<DashboardSummaryDTO>(
      `${path}/summary?${queryParams}`
    );
    return reponseData;
  };

  return { GetSummary };
}

export const dashboardService = _dashboardService();
