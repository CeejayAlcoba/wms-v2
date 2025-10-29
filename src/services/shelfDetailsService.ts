import type { ShelfDetails } from "../@types/tables/ShelfDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";

const path = "shelf-details";

function _shelfDetailsService() {
  const UpdateOccupancyStatus = async () => {
    await axiosInstance.patch(`${path}/occupancy-status`);
  };
  return { ...genericService<ShelfDetails>(path), UpdateOccupancyStatus };
}

export const shelfDetailsService = _shelfDetailsService();
