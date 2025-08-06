import type { BookingDetailsDTO } from "../@types/DTOs/BookingDetailsDTO";
import type { BookingDetails } from "../@types/tables/BookingDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "booking-details";

function _bookingDetailsService() {
  const GetAll = async (filters?: BookingDetails) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<BookingDetailsDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  const GetAllGoodsReceiptPending = async (filters?: BookingDetails) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<BookingDetailsDTO[]>(
      `${path}/list/goods-receipt/pending?${queryParams}`
    );
    return data;
  };
  const GetAllGoodsReceipCompleted = async (filters?: BookingDetails) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<BookingDetailsDTO[]>(
      `${path}/list/goods-receipt/completed?${queryParams}`
    );
    return data;
  };
  return {
    ...genericService<BookingDetails>(path),
    GetAll,
    GetAllGoodsReceiptPending,
    GetAllGoodsReceipCompleted,
  };
}

export const bookingDetailsService = _bookingDetailsService();
