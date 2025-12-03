import type { CSSProperties } from "react";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import { handleMoney } from "../../../utils/handleMoney";

type BillingFooterProps = {
  billing: BillingDTO | null;
};

const headStyle: CSSProperties = {
  width: "657px",
  textAlign: "end",
};
export default function BillingFooter(props: BillingFooterProps) {
  const { billing } = props;

  return (
    <table
      className="table table-bordered"
      style={{ borderTop: "1px solid #000" }}
    >
      <thead>
        <tr>
          <th style={headStyle}>Total</th>
          <td>{handleMoney(billing?.unVatableAmount)}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th style={headStyle}>VAT {billing?.vat}%</th>
          <td>{handleMoney(billing?.vatCost)}</td>
        </tr>
        <tr>
          <th style={headStyle}>Total Amount</th>
          <th>{handleMoney(billing?.vatableAmount)}</th>
        </tr>
      </tbody>
    </table>
    // <div className="d-flex flex-column align-items-end">
    //   <div>
    //     <strong>Total </strong> {handleMoney(billing?.unVatableAmount)}
    //   </div>
    //   <div>
    //     <strong>VAT {billing?.vat}% </strong> {handleMoney(billing?.vatCost)}
    //   </div>
    //   <div>
    //     <strong>Total Amount </strong> {handleMoney(billing?.vatableAmount)}
    //   </div>
    // </div>
  );
}
