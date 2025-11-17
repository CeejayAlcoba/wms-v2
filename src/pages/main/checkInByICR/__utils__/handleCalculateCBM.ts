type CaculateCBMParams = {
  lengthCm?: number | null;
  heightCm?: number | null;
  widthCm?: number | null;
  quantity?: number | null;
};

export default function handleCaculateCBM({
  lengthCm,
  heightCm,
  widthCm,
  quantity,
}: CaculateCBMParams) {
  return (
    ((lengthCm || 0) / 100) *
    ((heightCm || 0) / 100) *
    ((widthCm || 0) / 100) *
    (quantity || 0)
  );
}
