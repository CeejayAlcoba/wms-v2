import type { ReactNode } from "react";

export type GridListColumnsProps<T = any> = {
  key: keyof T;
  label?: string;
  title?: string;
  render?: (value?: any, record?: T, index?: number) => ReactNode;
}[];

interface GridListProps<T = any> {
  data: T;
  columns: GridListColumnsProps<T>;
  cols?: number;
  gutter?: number;
}

export function GridList<T = any>(props: GridListProps<T>) {
  const { columns, data, cols = 3, gutter = 3 } = props;

  if (!data) return null;

  const colWidth = Math.floor(12 / cols);

  return (
    <div className={`row row-cols-lg-${gutter}`}>
      {columns.map((col, index) => {
        if (col.title) {
          return (
            <div className={`col-${colWidth}`} key={`title-${index}`}>
              <strong>{col.title}</strong>
            </div>
          );
        }

        const value = data[col.key] as ReactNode;

        return (
          <div className={`col-${colWidth}`} key={String(col.key)}>
            {col.label && <strong>{col.label}: </strong>}
            {col.render ? col.render(value, data, index) : value}
          </div>
        );
      })}
    </div>
  );
}
