import type { InboundDTO } from "../@types/DTOs/InboundDTO";
import type { InboundFilterDTO } from "../@types/DTOs/InboundFilterDTO";
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "inbound";

function _inboundService() {
  const GetAll = async (filters: InboundFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<InboundDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  return { GetAll };
}

export const inboundService = _inboundService();
