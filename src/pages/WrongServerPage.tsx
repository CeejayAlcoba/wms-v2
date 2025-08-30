import { Result, Button, theme } from "antd";

type WrongServerPageProps = {
  handleGetMenuItems: () => void;
};

const WrongServerPage = ({ handleGetMenuItems }: WrongServerPageProps) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
      }}
    >
      <Result
        status="500"
        title={<span style={{ color: token.colorText }}>500</span>}
        subTitle={
          <span style={{ color: token.colorTextSecondary }}>
            Sorry, something went wrong.
          </span>
        }
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
