import type { ReactNode } from "react";
import type { BillingStatementDTO } from "../@types/DTOs/BillingStatementDTO";
import type { OtherServiceBillDTO } from "../@types/DTOs/OtherServiceBillDTO";
import { handleMoney } from "./handleMoney";
import type { RefServiceField } from "../@types/tables/RefServiceField";

export type GroupBillType = {
  service: string;
  date: string;
  formula: string;
  values: RefServiceField[][];
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

    // const value = item.serviceFields.map((f) => (
    //   <div className="d-flex gap-1">
    //     <strong>{f.name} : </strong>
    //     <span>{f.value}</span>
    //   </div>
    // ));

    // grouped[key].values.push(
    //   <div className="border rounded-1 p-1">
    //     <div className={`row row-cols-md-${value.length + 2}`}>
    //       {item.date} <div>{item.date}</div>
    //       {value}
    //       <div>{handleMoney(item.totalAmount ?? 0)}</div>
    //     </div>
    //   </div>
    // );
    grouped[key].values.push(item.serviceFields);
    grouped[key].amounts.push(item.totalAmount ?? 0);
    grouped[key].totalAmount += item.totalAmount ?? 0;
  });

  return Object.values(grouped);
};

export default handleGroupOtherServices;
