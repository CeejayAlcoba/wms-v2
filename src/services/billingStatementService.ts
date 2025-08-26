import type { BillingStatementDTO } from "../@types/DTOs/BillingStatementDTO";
import type { BillingStatementWithServiceReportDTO } from "../@types/DTOs/BillingStatementWithServiceReportDTO";
import type { BillingStatement } from "../@types/tables/BillingStatement";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "billing-statement";

function _billingStatementService() {
  const GetById = async (id: number) => {
    const { data } =
      await axiosInstance.get<BillingStatementWithServiceReportDTO>(
        `${path}/${id}`
      );
    return data;
  };

  const Update = async (
    id: number,
    data: BillingStatementWithServiceReportDTO
  ) => {
    const { data: reponseData } = await axiosInstance.patch<BillingStatement>(
      `${path}/${id}`,
      data
    );
    return reponseData;
  };

  const Add = async (data: BillingStatementWithServiceReportDTO) => {
    const { data: reponseData } = await axiosInstance.post<BillingStatement>(
      path,
      data
    );
    return reponseData;
  };
  const GetAll = async (filters?: BillingStatement) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<BillingStatementDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  return {
    ...genericService<BillingStatement>(path),
    Add,
    GetById,
    Update,
    GetAll,
  };
}

export const billingStatementService = _billingStatementService();
