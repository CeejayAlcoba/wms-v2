import { billingStatementService } from "../../services/billingStatementService";

let checkTimeOut: ReturnType<typeof setTimeout>;

const validateBillingReference = (value: string) => {
  if (checkTimeOut) clearTimeout(checkTimeOut);

  return new Promise((resolve) => {
    checkTimeOut = setTimeout(async () => {
      const references = await billingStatementService.GetAll({
        referenceNumber: value,
      });
      resolve(references);
    }, 500);
  });
};

export default validateBillingReference;
