import { Spin } from "antd";

export default function LoadingScreenLayout() {
  return (
    <div
      style={{
        width: "80vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" tip="Loading" />
    </div>
  );
}
