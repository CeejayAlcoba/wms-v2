import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Typography, message, Alert } from "antd";
import { authService } from "../../../services/authService";
import InvalidOrExpiredToken from "./InvalidOrExpiredToken";
import LoadingScreenLayout from "../../layouts/LoadingScreenLayout";
import type { ChangePasswordDTO } from "../../../@types/DTOs/ChangePasswordDTO";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { FormikProvider, useFormik } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { changePasswordSchema } from "../../../schemas/changePasswordSchema";
import { LockOutlined } from "@ant-design/icons";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";

const { Title, Text } = Typography;

const ChangePasswordPage: React.FC = () => {
  const [isGoodToken, setIsGoodToken] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();
  const handleCheckToken = async () => {
    try {
      const res: string = await authService.ForgotPasswordCheckToken(
        token ?? ""
      );
      console.log(res);
      if (res) return setIsGoodToken(true);
      setIsGoodToken(false);
    } catch {
      setIsGoodToken(false);
    }
  };
  useEffect(() => {
    handleCheckToken();
  }, []);
  const handleSubmit = async (values: ChangePasswordDTO) => {
    if (!token) {
      message.error("Invalid or missing reset token.");
      return;
    }
    const payload: ChangePasswordDTO = {
      token,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    try {
      await authService.ChangePassword(payload);
      SweetAlert({
        title: "Password changed successfully! Please login again.",
        timer: undefined,
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (error: any) {
      message.error(error.message || "Failed to change password.");
    }
  };
  const formik = useFormik({
    initialValues: EMPTY_FORM,
    validationSchema: changePasswordSchema,
    onSubmit: handleSubmit,
  });

  if (isGoodToken === null) return <LoadingScreenLayout />;
  if (isGoodToken === false) return <InvalidOrExpiredToken />;

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{
          width: 580,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-4">
          <Title level={3}>Change Password</Title>
          <Text type="secondary">Enter your new password below</Text>
        </div>

        <FormikProvider value={formik}>
          <Form>
            <InputPasswordFormik<ChangePasswordDTO>
              askterisk
              name="password"
              label="New Password"
              prefix={<LockOutlined />}
              onChange={() => formik.setStatus(null)}
            />
            <InputPasswordFormik<ChangePasswordDTO>
              askterisk
              name="confirmPassword"
              label="Confirm Password"
              prefix={<LockOutlined />}
              onChange={() => formik.setStatus(null)}
            />

            {formik.status && (
              <Alert
                type={
                  formik.status.toLowerCase().includes("success")
                    ? "success"
                    : "error"
                }
                message={formik.status}
                showIcon
              />
            )}

            <Button
              type="primary"
              htmlType="submit"
              loading={formik.isSubmitting}
              onClick={() => formik.submitForm()}
              className="w-100"
            >
              Change Password
            </Button>
          </Form>
        </FormikProvider>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
