// src/components/forms/InitialPasswordForm.tsx

import { useState } from "react";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { meService } from "../../../services/meService";
import type { AxiosError } from "axios";
import type { ProfileDTO } from "../../../@types/DTOs/ProfileDTO";

const { Title, Text } = Typography;

type InitialPasswordFormProps = {
  onSucess: (data: ProfileDTO) => void;
};
export default function InitialPasswordForm({
  onSucess,
}: InitialPasswordFormProps) {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleFinish = async (values: { password: string }) => {
    setLoading(true);
    try {
      setError(null);
      const user = await meService.GetProfile(values.password);
      onSucess(user);
    } catch (e: any) {
      const ex: AxiosError = e;
      setError((ex.response?.data as string) ?? "Request failed");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex items-center justify-content-center w-100">
      <Card
        className="w-full max-w-md shadow-md rounded-2xl"
        style={{ width: 700 }}
      >
        <div className="text-center mb-6">
          <LockOutlined style={{ fontSize: 36, color: "#1677ff" }} />
          <Title level={4} style={{ marginTop: 12 }}>
            Confirm Your Identity
          </Title>
          <Text type="secondary">Please enter your password to continue</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              className="mb-3"
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
