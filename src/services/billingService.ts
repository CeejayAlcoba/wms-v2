import type { BillingDTO } from "../@types/DTOs/BillingDTO";
import type { BillingFilterDTO } from "../@types/DTOs/BillingFilterDTO";
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "billing";

function _billingService() {
  const Get = async (filters?: BillingFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<BillingDTO>(
      `${path}?${queryParams}`
    );
    return data;
  };
  return { Get };
}

export const billingService = _billingService();
