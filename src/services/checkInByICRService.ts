import type { CheckInByICRDTO } from "../@types/DTOs/CheckInByICRDTO";
import axiosInstance from "./axiosIntance";

const path = "check-in-by-icr";

function _checkInByICRService() {
const Add = async (data: CheckInByICRDTO) => {
    const { data: reponseData } = await axiosInstance.post<CheckInByICRDTO>(path, data);
    return reponseData;
  };
  return { Add };
}

export const checkInByICRService = _checkInByICRService();
