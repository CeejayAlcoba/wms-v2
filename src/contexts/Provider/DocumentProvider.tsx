import React, { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DocumentContext } from "../useDocument";
import { useReactToPrint } from "react-to-print";
import SweetAlertProgress from "../../components/SweetAlert/SweetAlertProgress";
import html2pdf from "html2pdf.js";

type handleDelayProps = {
  fn: (delay: number) => void;
};
const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  const [title, setTitle] = useState<string>("");
  const contentRef = useRef(null);

  const handleReactToPrint = useReactToPrint({
    contentRef,
    pageStyle: `
        @page {
          size: A4; 
          margin: 11mm 5mm 11mm 5mm; 
        }
      `,
  });

  const handleDelay = (props: handleDelayProps) => {
    const { fn } = props;
    if (progress !== null) {
      fn(500);
    }
    let newProgress = 0;

    const progressInterval = setInterval(() => {
      newProgress = (newProgress ?? 0) + 10;
      SweetAlertProgress({
        progress: newProgress,
        progressProps: {
          title: "Preparing your document...",
        },
      });

      if (newProgress >= 100) {
        fn(0);
        clearInterval(progressInterval);
      }
    }, 100);
  };

  const handleDownloadPdf = () => {
    const element = contentRef.current;
    if (!element) return;

    SweetAlertProgress({
      progress: 0,
      progressProps: { title: "📄 Generating PDF..." },
    });
    handleDelay({
      fn: () =>
        html2pdf()
          .from(element)
          .set({
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `${title || "document"}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          })
          .save(),
    });
  };

  const handlePrint = () => {
    handleDelay({
      fn: () => handleReactToPrint(),
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        progress,
        setProgress,
        data,
        setData,
        columns,
        setColumns,
        title,
        setTitle,
        handlePrint,
        handleDownloadPdf,
        contentRef,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;
