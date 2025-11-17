import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import { handleMoney } from "../../../utils/handleMoney";

type BillingFooterProps = {
  billing: BillingDTO | null;
};
export default function BillingFooter(props: BillingFooterProps) {
  const { billing } = props;

  return (
    
  <div className="d-flex flex-column align-items-end">
  <div>
    <strong>Total </strong> {handleMoney(billing?.unVatableAmount)}
  </div>
  <div>
    <strong>VAT {billing?.vat}% </strong> {handleMoney(billing?.vatCost)}
  </div>
  <div>
    <strong>Total Amount </strong> {handleMoney(billing?.vatableAmount)}
  </div>
</div>

  );
}
