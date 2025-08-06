import type { GoodsReceiptDTO } from "../@types/DTOs/GoodsReceiptDTO";
import type { GoodsReceipt } from "../@types/tables/GoodsReceipt";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";

const path = "goods-receipt";

function _goodsReceiptService() {
  const Add = async (data: GoodsReceiptDTO) => {
    const { data: reponseData } = await axiosInstance.post<GoodsReceipt>(
      path,
      data
    );
    return reponseData;
  };

  return { ...genericService<GoodsReceipt>(path), Add };
}

export const goodsReceiptService = _goodsReceiptService();
