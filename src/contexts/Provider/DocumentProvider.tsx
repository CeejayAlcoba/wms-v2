import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DocumentContext } from "../useDocument";
import SweetAlertProgress from "../../components/SweetAlert/SweetAlertProgress";

export interface DelayProps {
  fn: () => void;
  progress?: number;
}

const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnsType<any>>([]);

  const handleDelay = ({ fn, progress }: DelayProps) => {
    let intervalId: NodeJS.Timeout;
    let simulatedProgress = 0;
    console.log(progress);
    if (progress == undefined) {
      intervalId = setInterval(() => {
        simulatedProgress += 10;
        SweetAlertProgress({
          progress: simulatedProgress,
          progressProps: { title: "Preparing your document..." },
        });

        if (simulatedProgress >= 100) {
          setTimeout(() => {
            fn();
          }, 500);
          clearInterval(intervalId);
        }
      }, 100);
    } else {
      intervalId = setInterval(() => {
        SweetAlertProgress({
          progress: progress,
          progressProps: { title: "Preparing your document..." },
        });

        if (progress >= 100) {
          setTimeout(() => {
            fn();
          }, 500);
          clearInterval(intervalId);
        }
      }, 100);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        data,
        setData,
        columns,
        setColumns,
        handleDelay,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;
