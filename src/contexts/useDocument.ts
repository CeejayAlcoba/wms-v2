import { createContext, useContext } from "react";
import type { ColumnsType } from "antd/es/table";

type DocumentContextType<T = any> = {
  progress: number | null;
  setProgress: React.Dispatch<React.SetStateAction<number | null>>;

  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;

  columns: ColumnsType<T>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType<T>>>;

  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  handlePrint: () => void;
  handleDownloadPdf: () => void;
  contentRef: React.RefObject<null>;
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
