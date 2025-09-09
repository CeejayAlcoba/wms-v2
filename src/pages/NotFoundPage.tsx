import { Result, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
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
        status="404"
        title="404"
        style={{ color: "black" }}
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
