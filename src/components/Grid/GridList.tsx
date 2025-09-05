import type { ReactNode } from "react";

export type GridListColumnsProps<T = any> = {
  key: keyof T;
  label?: string;
  title?: string;
  render?: (value?: any, record?: T, index?: number) => ReactNode;
}[];

interface GridListProps<T = any> {
  data?: T;
  columns: GridListColumnsProps<T>;
  cols?: number;
}

export function GridList<T = any>(props: GridListProps<T>) {
  const { columns, data, cols = 3 } = props;

  if (!data) return null;

  return (
    <div className={`row row-cols-sm-${cols}`}>
      {columns.map((col, index) => {
        if (col.title) {
          return (
            <div key={`title-${index}`}>
              <strong>{col.title}</strong>
            </div>
          );
        }

        const value = data[col.key] as ReactNode;
        const ValueDisplay = () =>
          col.render
            ? col.render(value, data, index)
            : value ?? <span className="text-secondary">N/A</span>;
        return (
          <div key={String(col.key)}>
            {col.label && <strong>{col.label}: </strong>}
            <ValueDisplay />
          </div>
        );
      })}
    </div>
  );
}
