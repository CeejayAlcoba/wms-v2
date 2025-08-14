import { useRef } from "react";
import html2pdf from "html2pdf.js";

export function usePDF(ref?: React.RefObject<HTMLDivElement | null>) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = (title?: string) => {
    const element = ref ?? componentRef.current;

    html2pdf()
      .from(element)
      .set({
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${title || "document"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  return { componentRef, handleDownloadPDF };
}
