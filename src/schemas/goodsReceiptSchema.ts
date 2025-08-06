import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { GoodsReceipt } from "../@types/tables/GoodsReceipt";
import validateGoodsReceipt from "./utils/validateGoodsReceipt";

export const goodsReceiptSchema: yup.Schema<GoodsReceipt> = yup.object({
  id: yup.number().nullable(),
  name: yup
    .string()
    .required(requiredMessage)
    .test(
      "unique-goods-receipt",
      "Goods receipt already exists.",
      async function (value) {
        const { id } = this.parent;
        if (!value) return true;

        const bookings: any = await validateGoodsReceipt(value);
        const isDuplicate = bookings.some((d: any) => d.id !== id);
        return !isDuplicate;
      }
    ),
});
