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
  header?:ReactNode;
};

export default function BodyLayout({ particular, header }: BodyLayoutProps) {
  const headerBgColor = "#d9d9d9";
  return (
    <>
    <tr>
        <td style={{ backgroundColor: headerBgColor }}></td>
        <td style={{ backgroundColor: headerBgColor }}>{header}</td>
      </tr>
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
      
    </>
  );
}
