import { Result, Button } from "antd";


type WrongServerPageProps={
    handleGetMenuItems:()=>void
}
const WrongServerPage = ({handleGetMenuItems}:WrongServerPageProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => handleGetMenuItems()}>
            Refresh Page
          </Button>
        }
      />
    </div>
  );
};

export default WrongServerPage;
