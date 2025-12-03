export const handleMoney = (number?: number, prefixSign?: boolean) => {
  prefixSign ??= true;
  if (number == null) return null;

  let str = `${number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return prefixSign ? `Php ${str}` : str;
};
