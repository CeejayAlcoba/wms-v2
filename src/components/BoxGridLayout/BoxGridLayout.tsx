import type { ReactNode } from "react";
import "./BoxGridLayout.css";

type BoxGridLayoutPorps = {
  children?: ReactNode;
  id: string;
};
const BoxGridLayout = ({ children, id }: BoxGridLayoutPorps) => {
  return (
    <div id={id} className="grid-background">
      {children}
    </div>
  );
};

export default BoxGridLayout;
