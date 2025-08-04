import { Spin } from "antd";

export default function LoadingScreenLayout() {
  return (
    <div
      style={{
        width: "76vw",
        height: "76vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" tip="Loading" />
    </div>
  );
}
