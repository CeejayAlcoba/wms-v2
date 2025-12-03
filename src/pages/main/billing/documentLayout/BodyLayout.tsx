import type { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import type { CSSProperties, ReactNode } from "react";

export type ContentType = {
  date?: Date | null;
  particulars?: ReactNode[];
};
type BodyLayoutProps<T> = {
  columns?: ColumnType<T>[];
  data?: T[];
  titleHeader?: ReactNode;
  titleFooter?: ReactNode;
  totalCbmPallete?: ReactNode;
  rate?: ReactNode;
  bill?: ReactNode;
};

const mainTh: CSSProperties = {
  color: "red",
};

export default function BodyLayout<T = any>({
  columns,
  data,
  titleHeader,
  titleFooter,
  totalCbmPallete,
  rate,
  bill,
}: BodyLayoutProps<T>) {
  return (
    <>
      {titleHeader && (
        <table className="table  table-bordered" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th style={{ width: "100px" }}></th>
              <th className="d-flex justify-content-around">
                <div>{titleHeader}</div> <div>{totalCbmPallete}</div>
                <div>{rate}</div> <div>{bill}</div>
              </th>
            </tr>
          </thead>
        </table>
      )}

      <table className="table table-bordered text-center" style={{ margin: 0 }}>
        <thead>
          <tr>
            <th style={{ width: "100px" }}></th>
            {columns?.slice(1).map((c, key) => (
              <th style={mainTh} key={key}>
                {c.title as string}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((d, rowIdx) => (
            <tr>
              {columns?.map((c, colIdx) => {
                const value =
                  typeof c.dataIndex === "string"
                    ? (d as any)[c.dataIndex]
                    : undefined;

                const cellContent = c.render
                  ? c.render(value, d, rowIdx)
                  : value;
                if (!cellContent) return <td key={colIdx}></td>;

                return <td key={colIdx}>{cellContent}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {titleFooter && (
        <table className="table  table-bordered" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th style={{ width: "100px" }}></th>
              <th className="d-flex justify-content-around">
                <div>{titleFooter}</div> <div>{totalCbmPallete}</div>
                <div>{rate}</div> <div>{bill}</div>
              </th>
            </tr>
          </thead>
        </table>
      )}
    </>
  );
}
