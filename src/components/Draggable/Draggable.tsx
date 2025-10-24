import { Rnd, type Props } from "react-rnd";
import type { ReactNode } from "react";

type DraggableProps = {
  children: ReactNode;
  initialX?: number;
  initialY?: number;
} & Props &
  React.HTMLAttributes<HTMLDivElement>;

export default function Draggable({
  children,
  initialX = 0,
  initialY = 0,
  minWidth = 200,
  minHeight = 100,
  ...rest
}: DraggableProps) {
  return (
    <div>
      <Rnd
        default={{
          x: initialX,
          y: initialY,
          width: minWidth,
          height: minHeight,
        }}
        style={{
          padding: 5,
          border: "1px solid #aaa",
        }}
        minWidth={200}
        minHeight={100}
        {...rest}
      >
        <div
          style={{
            margin: 0,
            height: "100%",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </Rnd>
    </div>
  );
}
