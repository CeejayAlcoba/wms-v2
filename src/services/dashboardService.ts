import type { DashboardSummaryDTO } from "../@types/DTOs/DashboardSummaryDTO";
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "dashboard";

function _dashboardService() {
  const GetSummary = async (principalId?: number | null) => {
    const queryParams = objectToQueryParam({ principalId: principalId });
    const { data: reponseData } = await axiosInstance.get<DashboardSummaryDTO>(
      `${path}/summary?${queryParams}`
    );
    return reponseData;
  };

  return { GetSummary };
}

export const dashboardService = _dashboardService();
