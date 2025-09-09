import React from "react";
import { Button, Card, Space, Alert, Typography } from "antd";
import { FormikProvider, Form, useFormik, type FormikHelpers } from "formik";
import {
  CalendarOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import InputFormik from "../../../components/Formik/InputFormik";
import type { ForgotPasswordRequestDTO } from "../../../@types/DTOs/ForgotPasswordRequestDTO";
import { authService } from "../../../services/authService";
import { forgotPasswordRequestSchema } from "../../../schemas/forgotPasswordRequestSchema";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import { useAuthFormTypeContext } from "../../../contexts/useAuthFormTypeContext";
import { useNavigate } from "react-router-dom";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

const { Title, Text } = Typography;

const ForgotPasswordForm: React.FC = () => {
  const { setType } = useAuthFormTypeContext();

  const navigate = useNavigate();

  const handleSubmit = async (
    values: ForgotPasswordRequestDTO,
    helpers: FormikHelpers<ForgotPasswordRequestDTO>
  ) => {
    try {
      const token: string = await authService.ForgotPasswordRequest(values);
      setType("login");
      navigate(`/change-password/${token}`);
    } catch (error: any) {
      helpers.setStatus(error?.response?.data || "Unable to process request.");
    }
  };

  const formik = useFormik({
    initialValues: EMPTY_FORM,
    validationSchema: forgotPasswordRequestSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-4">
          <Title level={3}>Forgot Password</Title>
          <Text type="secondary">
            Enter your details below to reset your password
          </Text>
        </div>

        <FormikProvider value={formik}>
          <Form>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <InputFormik<ForgotPasswordRequestDTO>
                askterisk
                name="username"
                label="Username"
                prefix={<UserOutlined />}
                onChange={() => formik.setStatus(null)}
              />
              <InputFormik<ForgotPasswordRequestDTO>
                askterisk
                name="employeeNumber"
                label="Employee Number"
                prefix={<IdcardOutlined />}
                onChange={() => formik.setStatus(null)}
              />
              <DatePickerFormik<ForgotPasswordRequestDTO>
                askterisk
                name="birthday"
                label="Birthday"
                prefix={<CalendarOutlined />}
                onChange={() => formik.setStatus(null)}
              />

              {formik.status && (
                <Alert
                  type={formik.status.includes("sent") ? "success" : "error"}
                  message={formik.status}
                  showIcon
                />
              )}

              <Button
                type="primary"
                htmlType="submit"
                loading={formik.isSubmitting}
                className="w-100"
              >
                Request Reset
              </Button>
            </Space>
          </Form>
        </FormikProvider>

        <div className="text-center mt-3">
          <Button type="link" onClick={() => setType("login")}>
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
