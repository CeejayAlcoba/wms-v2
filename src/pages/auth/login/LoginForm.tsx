import React from "react";
import logo from "../../../assets/afreight-logo.png";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { LoginDTO } from "../../../@types/DTOs/LoginDTO";
import { Alert, Button, Card, Divider, Typography, Space } from "antd";
import {
  ArrowRightOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import InputFormik from "../../../components/Formik/InputFormik";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";
import { loginSchema } from "../../../schemas/loginSchema";
import { TOKEN_KEY, USER_KEY } from "../../../constants/LOCAL_STORAGE_KEYS";
import useUser from "../../../contexts/useUser";
import { authService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuthFormTypeContext } from "../../../contexts/useAuthFormTypeContext";
import HeaderForm from "../HeaderForm";

const { Title, Text } = Typography;

const emptyForm: LoginDTO = {
  username: null,
  password: null,
};

export const LoginForm: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { setType } = useAuthFormTypeContext();

  const handleLogIn = async (
    values: LoginDTO,
    formikHelpers: FormikHelpers<LoginDTO>
  ) => {
    try {
      const res = await authService.Login(values);
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      setUser(res.user);
      navigate("/");
    } catch (error: any) {
      formikHelpers.setStatus(error?.response?.data || "Login failed.");
    }
  };

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: emptyForm,
    onSubmit: handleLogIn,
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
          <img src={logo} alt="Logo" style={{ height: 70, marginBottom: 12 }} />
          <Title level={3}>Welcome Back</Title>
          <Text type="secondary">Please login to continue</Text>
        </div>

        <FormikProvider value={formik}>
          <Form>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <InputFormik<LoginDTO>
                askterisk
                name="username"
                label="Username"
                prefix={<UserOutlined />}
                onChange={() => formik.setStatus(null)}
              />
              <InputPasswordFormik<LoginDTO>
                askterisk
                name="password"
                label="Password"
                prefix={<LockOutlined />}
                onChange={() => formik.setStatus(null)}
              />
              {formik.status && (
                <Alert type="error" message={formik.status} showIcon />
              )}

              <Button
                htmlType="submit"
                type="primary"
                loading={formik.isSubmitting}
                className="w-100"
                size="large"
                icon={<ArrowRightOutlined />}
              >
                Login
              </Button>
            </Space>
          </Form>
        </FormikProvider>

        <Divider plain>or</Divider>

        <div className="text-center">
          <Text type="secondary">Don’t have an account?</Text>
          <Button type="link" onClick={() => setType("signup")}>
            Sign Up
          </Button>
        </div>
      </Card>
    </div>
  );
};
