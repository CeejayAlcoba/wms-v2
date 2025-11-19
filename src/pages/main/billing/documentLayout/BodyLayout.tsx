import dayjs from "dayjs";
import type { ReactNode } from "react";

export type ContentType = {
  date?: Date | null;
  particulars?: ReactNode[];
};
type BodyLayoutProps = {
  particular?: {
    headers: ReactNode[];
    contents?: ContentType[];
  };
  rate?: ReactNode;
  bill?: ReactNode[];
  header?: ReactNode;
  footer?: ReactNode;
};
const bgColor = "#d9d9d9";
export default function BodyLayout({
  particular,
  header,
  footer,
}: BodyLayoutProps) {
  return (
    <>
      {header && (
        <tr>
          <td style={{ backgroundColor: bgColor }}></td>
          <td style={{ backgroundColor: bgColor }}>{header}</td>
        </tr>
      )}

      <tr className="text-center">
        <td></td>
        <td className={`row row-cols-${particular?.headers.length}`}>
          {particular?.headers?.map((c, idx) => (
            <div style={{ width: 100 }} key={idx} className="col">
              {c}
            </div>
          ))}
        </td>
      </tr>
      {particular?.contents?.map((c, index) => (
        <tr key={index} className="text-center">
          <td>{c.date && dayjs(c.date).format("DD-MMM-YY")}</td>
          <td>
            <td className={`row row-cols-${particular?.headers.length}`}>
              {c.particulars?.map((p) => (
                <div style={{ width: 100 }} className="col">
                  {p}
                </div>
              ))}
            </td>
          </td>
        </tr>
      ))}
      {footer && (
        <tr>
          <td style={{ backgroundColor: bgColor }}></td>
          <td style={{ backgroundColor: bgColor }}>{footer}</td>
        </tr>
      )}
    </>
  );
}
