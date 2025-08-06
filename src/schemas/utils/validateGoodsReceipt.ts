import { goodsReceiptService } from "../../services/goodsReceiptService";

let checkTimeOut: ReturnType<typeof setTimeout>;

const validateGoodsReceipt = (value: string) => {
  if (checkTimeOut) clearTimeout(checkTimeOut);

  return new Promise((resolve) => {
    checkTimeOut = setTimeout(async () => {
      const goodsReceipts = await goodsReceiptService.GetAll({
        name: value,
      });
      resolve(goodsReceipts);
    }, 500);
  });
};

export default validateGoodsReceipt;
