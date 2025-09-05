import { Card, type CardProps } from "antd";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import { handleMoney } from "../../../utils/handleMoney";

type BillingFooterProps = {
  billing: BillingDTO | null;
} & CardProps;
export default function BillingFooter(props: BillingFooterProps) {
  const { billing,...rest } = props;

  return (
    <Card {...rest}>
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
