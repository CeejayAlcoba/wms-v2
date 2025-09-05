import type { BillingSignatoriesConfig } from "../../../../@types/tables/BillingSignatoriesConfig";

type SignatoriesLayoutProps = {
  signatories?: BillingSignatoriesConfig[];
};
export default function SignatoriesLayout({
  signatories,
}: SignatoriesLayoutProps) {
  return (
    <div className="row row-cols-sm-2 gap-2">
      {signatories?.map((signatory) => (
        <div className="row row-cols-sm-1 text-center">
          <div>{signatory.title}</div>
          <div> ________________________</div>
          <div className="fw-bold"> {signatory.name}</div>
        </div>
      ))}
    </div>
  );
}
