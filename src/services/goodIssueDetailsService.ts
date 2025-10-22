import type { GoodIssueDetailsFilterDTO } from "../@types/DTOs/GoodIssueDetailsFilterDTO";
import type { GoodIssueDetailsGetDTO } from "../@types/DTOs/GoodIssueDetailsGetDTO";
import type { GoodIssueDetails } from "../@types/tables/GoodIssueDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "good-issue-details";

function _goodIssueDetailsService() {
  const GetAll = async (filters?: Partial<GoodIssueDetailsFilterDTO>) => {
    const queryParams = objectToQueryParam(filters);
    console.log(filters);
    const { data } = await axiosInstance.get<GoodIssueDetailsGetDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  return { ...genericService<GoodIssueDetails>(path), GetAll };
}

export const goodIssueDetailsService = _goodIssueDetailsService();
