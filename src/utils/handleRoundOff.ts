import { DECIMAL_ROUND } from "../constants/DECIMAL";

export const handleRoundOff = (number?: number) => {
    if(!number) return null;
    // if(number < 0) return 0;
  const roundedString = number.toFixed(DECIMAL_ROUND);
  return parseFloat(roundedString);
};

