import type { ReactNode } from "react";

export type TableTotalFooterProps = {
  label: ReactNode | string;
  name: string;
  value?: ReactNode | any;
}[];

export default function TableTotalFooter<T = any>(props: {
  values: TableTotalFooterProps;
  data: T[];
}) {
  const { values, data } = props;
  const size = Math.floor(values.length / 3);
  return (
    <div className="d-flex justify-content-start">
      <div className={`row row-cols-lg-${size}`}>
        {values?.map((p, index) => (
          <div key={index}>
            <span>{`${p.label} : `}</span>
            <strong>
              {p.value ?? data?.[0]?.[p.name as keyof T] ?? "N/A"}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
