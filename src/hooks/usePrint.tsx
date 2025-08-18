import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrint(ref?: React.RefObject<HTMLDivElement | null>) {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: ref ?? componentRef,
    pageStyle: `
        @page {
          size: A4; 
          margin: 11mm 5mm 11mm 5mm; 
        }
      `,
  });

  return { componentRef, handlePrint };
}
