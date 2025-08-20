export const handleMoney = (number?: number) => {
  if (!number) return null;
  const formatedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });
  return formatedNumber;
};
