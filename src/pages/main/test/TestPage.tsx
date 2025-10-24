import Draggable from "../../../components/Draggable/Draggable";

export default function TestPage() {
  return (
    <>
      <div style={{ padding: 50 }}>
        <Draggable>
          <div style={{ textAlign: "center" }}>Drag or Resize me</div>
        </Draggable>
      </div>
    </>
  );
}
