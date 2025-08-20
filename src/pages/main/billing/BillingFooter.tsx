import { Card } from "antd";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import { handleMoney } from "../../../utils/handleMoney";

type BillingFooterProps = {
  billing: BillingDTO | null;
};
export default function BillingFooter(props: BillingFooterProps) {
  const { billing } = props;

  return (
    <Card>
      <div>
        <div>
          <strong>Total :</strong> {handleMoney(billing?.unVatableAmount)}
        </div>
        <div>
          <strong>VAT {billing?.vat}% :</strong> {handleMoney(billing?.vatCost)}
        </div>
        <div>
          <strong>Total Amount: </strong> {handleMoney(billing?.vatableAmount)}
        </div>
      </div>
    </Card>
  );
}
