import { DECIMAL_MONEY } from "../constants/DECIMAL";

export const handleMoney = (number?: number) => {
  if (!number) return null;
  const roundedString = number.toFixed(DECIMAL_MONEY);
  return parseFloat(roundedString);
};
