import { createContext, useContext } from "react";
import type { ColumnsType } from "antd/es/table";
import type { DelayProps } from "./Provider/DocumentProvider";

type DocumentContextType<T = any> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;

  columns: ColumnsType<T>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType<T>>>;
  handleDelay: (props: DelayProps) => void;
};

export const DocumentContext = createContext<DocumentContextType | null>(null);

const useDocument = <T = any>() => {
  const context = useContext(
    DocumentContext as React.Context<DocumentContextType<T> | null>
  );
  if (!context) throw new Error("DocumentContext is null");

  return context;
};

export default useDocument;
