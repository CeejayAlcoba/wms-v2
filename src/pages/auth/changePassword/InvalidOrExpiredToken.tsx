import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Paragraph, Text } = Typography;

export default function InvalidOrExpiredToken() {
  const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="Invalid or Expired Link"
      subTitle="Sorry, the reset link you used is invalid or has expired."
      extra={[
        <Button key="login" onClick={() => navigate("/login")}>
          Back to Login
        </Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text strong style={{ fontSize: 16 }}>
            Why this happened:
          </Text>
        </Paragraph>
        <Paragraph>
          • The link was already used.
          <br />
          • The link expired for security reasons.
          <br />• The link is invalid or broken.
        </Paragraph>
      </div>
    </Result>
  );
}
