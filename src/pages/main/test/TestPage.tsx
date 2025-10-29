import Draggable from "../../../components/Draggable/Draggable";

export default function TestPage() {
  return (
    <>
      <div style={{ padding: 50 }}>
        <Draggable
          onDragStop={(_, d) => console.log(d)}
          initialX={0}
          initialY={0}
        >
          <div style={{ textAlign: "center" }}>Drag or Resize me</div>
        </Draggable>
      </div>
    </>
  );
}
