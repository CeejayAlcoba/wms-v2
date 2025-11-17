import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type Orientation = "portrait" | "landscape";

type UsePrintOptions = {
  ref?: React.RefObject<any | null>;
  onBeforePrint?: (() => Promise<void>) | undefined;
  onAfterPrint?: (() => Promise<void>) | undefined;
  delay?: number;
  orientation?: Orientation;
};

export function usePrint({
  ref,
  onBeforePrint,
  onAfterPrint,
  delay = 500,
  orientation = "portrait",
}: UsePrintOptions = {}) {
  const componentRef = useRef<any | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: ref ?? componentRef,
    onBeforePrint: async () => {
      if (onBeforePrint) {
        await onBeforePrint();
      }
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    },
    onAfterPrint,
    pageStyle: `
      @page {
        size: A4 ${orientation};
        margin: 5mm 5mm 5mm 5mm; 
      }
      *{
       font-size: 12px;
      }
         body {
      font-size: 12px;
    }

    table {
      font-size: 12px; 
    }

    th {
      font-size: 12px;
      font-weight: bold;
    }
    `,
  });

  return { componentRef, handlePrint };
}
