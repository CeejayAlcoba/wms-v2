import { useRef } from "react";
import html2pdf from "html2pdf.js";

type Orientation = 'portrait' | 'landscape';

type UsePDFOptions = {
  ref?: React.RefObject<HTMLDivElement | null>;
  delay?: number;
  onBeforeDownload?: () => Promise<void> | void;
  onAfterDownload?: () => Promise<void> | void;
  fontSize?: number;
  orientation?: Orientation; 
};

export function usePDF({
  ref,
  delay = 500,
  onBeforeDownload,
  onAfterDownload,
  fontSize,
  orientation = 'portrait',
}: UsePDFOptions) {
 const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async (title?: string) => {
    const element = ref?.current ?? componentRef.current;
    if (!element) return;

    if (onBeforeDownload) await onBeforeDownload();

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (fontSize) {
      element.style.fontSize = `${fontSize}px`;
    }

    await html2pdf()
      .from(element)
      .set({
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${title || "document"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation },
      })
      .save();

    if (onAfterDownload) await onAfterDownload();
  };

  return { componentRef, handleDownloadPDF };
}
