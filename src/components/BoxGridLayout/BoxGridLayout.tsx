import type { ReactNode } from "react";
import "./BoxGridLayout.css";

type BoxGridLayoutPorps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
const BoxGridLayout = ({ children, ...rest }: BoxGridLayoutPorps) => {
  return (
    <div className="grid-background" {...rest}>
      {children}
    </div>
  );
};

export default BoxGridLayout;
