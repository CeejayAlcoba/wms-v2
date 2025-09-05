import dayjs from "dayjs";
import type { ReactNode } from "react";

export type ContentType = {
  date?: Date | null;
  particulars?: ReactNode[];
};
type LayoutProps = {
  particular?: {
    headers: ReactNode[];
    contents?: ContentType[];
  };
  rate?: ReactNode;
  bill?: ReactNode[];
};

export default function InOutLayout({ particular, rate, bill }: LayoutProps) {
  return (
    <>
      <tr>
        <td></td>
        <td className={`row row-cols-lg-${particular?.headers.length}`}>
          {particular?.headers?.map((c) => c)}
        </td>
        <td>{rate}</td>
        <td> {bill?.[0]}</td>
      </tr>
      {particular?.contents?.map((c, index) => (
        <tr>
          <th>{c.date && dayjs(c.date).format("DD-MMM-YY")}</th>
          <td>
            <td className={`row row-cols-lg-${particular?.headers.length}`}>
              {c.particulars?.map((p) => (
                <div>{p}</div>
              ))}
            </td>
          </td>
          <td></td>
          <td>{bill?.[index + 1]}</td>
        </tr>
      ))}
    </>
  );
}
