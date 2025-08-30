import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type UsePrintOptions = {
  ref?: React.RefObject<any | null>;
  onBeforePrint?: (() => Promise<void>) | undefined;
  onAfterPrint?:(() => Promise<void>) | undefined;
  delay?: number;
};

export function usePrint({
  ref,
  onBeforePrint,
  onAfterPrint,
  delay = 500,
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
        size: A4; 
        margin: 11mm 5mm 11mm 5mm; 
      }
    `,
  });

  return { componentRef, handlePrint };
}
