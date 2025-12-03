import type { TableProps } from "antd";
import type { ReactNode } from "react";

export default function BootstrapTable<T extends object = any>(
  props: TableProps<T>
) {
  const { columns, dataSource } = props;

  return (
    <table
      className="table table-bordered align-middle text-center"
      style={{ margin: 0 }}
    >
      {columns?.some((s) => s.title) && (
        <thead>
          <tr>
            {columns?.map((c, colIdx) => (
              <th key={colIdx}>{(c.title as ReactNode) ?? ""}</th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {dataSource?.map((record, rowIdx) => (
          <tr key={rowIdx}>
            {columns?.map((c, colIdx) => {
              if ("dataIndex" in c) {
                const value = c.dataIndex
                  ? (record as any)[c.dataIndex as keyof T]
                  : undefined;

                if (c.render) {
                  return (
                    <td key={colIdx}>
                      {c.render(value, record, rowIdx) as ReactNode}
                    </td>
                  );
                }

                return <td key={colIdx}>{value as ReactNode}</td>;
              }

              return <td key={colIdx}></td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
