import type { BillingStatementDTO } from "../@types/DTOs/BillingStatementDTO";
import type { OtherServiceBillDTO } from "../@types/DTOs/OtherServiceBillDTO";
import type { ServiceFieldDTO } from "../@types/DTOs/ServiceFieldDTO";

export type GroupBillType = {
  service: string;
  date: string;
  formula: string;
  values: ServiceFieldDTO[];
  amounts: number[];
  totalAmount: number;
};

const handleGroupOtherServices = (
  otherServices: OtherServiceBillDTO[],
  record?: BillingStatementDTO
): GroupBillType[] => {
  const data = otherServices.filter((c) => c.billingStatementId == record?.id);
  const grouped: Record<string, GroupBillType> = {};

  data.forEach((item) => {
    const key = `${item.serviceConfig?.name}__${item.serviceConfig?.displayFormula}`;

    if (!grouped[key]) {
      grouped[key] = {
        date: item.date ?? "",
        service: item.serviceConfig?.name ?? "",
        formula: item.serviceConfig?.displayFormula ?? "",
        values: [],
        amounts: [],
        totalAmount: 0,
      };
    }
    const values: ServiceFieldDTO = {
      date: item.date,
      amount: item.totalAmount,
      fields: item.serviceFields,
    };
    grouped[key].values.push(values);
    grouped[key].amounts.push(item.totalAmount ?? 0);
    grouped[key].totalAmount += item.totalAmount ?? 0;
  });

  return Object.values(grouped);
};

export default handleGroupOtherServices;
