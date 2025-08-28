import type { OtherServiceBillDTO } from "../@types/DTOs/OtherServiceBillDTO";
import axiosInstance from "./axiosIntance";

const path = "other-service-bill";

function _otherServiceBillService() {
  const GetByBillingStatementId = async (id?: number) => {
    const { data } = await axiosInstance.get<OtherServiceBillDTO[]>(
      `${path}/billing-statement/${id}`
    );
    return data;
  };

  return { GetByBillingStatementId };
}

export const otherServiceBillService = _otherServiceBillService();
