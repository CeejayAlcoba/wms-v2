import React from "react";

import logo from "../../../assets/afreight-logo.png";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { LoginDTO } from "../../../@types/DTOs/LoginDTO";
import { Button, Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import InputFormik from "../../../components/Formik/InputFormik";
import { loginSchema } from "../../../schemas/loginSchema";
import { TOKEN_KEY, USER_KEY } from "../../../constants/LOCAL_STORAGE_KEYS";
import useUser from "../../../contexts/useUser";
import { authService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";

const emptyForm: LoginDTO = {
  username: null,
  password: null,
};

export const LoginForm: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
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
    <div className="d-flex justify-content-center align-items-center w-100">
      <Card className="p-2" style={{ height: "70%", width: "50%" }}>
        <div className="d-flex justify-content-center mb-2">
          <img src={logo} alt="truck-delivery" style={{ width: "75%" }} />
        </div>
        <FormikProvider value={formik}>
          <Form>
            <InputFormik<LoginDTO>
              askterisk
              name="username"
              label="Username"
              onChange={() => formik.setStatus(null)}
            />
            <InputPasswordFormik<LoginDTO>
              askterisk
              label="Password"
              type="password"
              name="password"
              onChange={() => formik.setStatus(null)}
            />
            {formik.status && (
              <div className="text-danger mb-2 text-center">
                {formik.status}
              </div>
            )}
            <Button
              htmlType="submit"
              type="primary"
              onClick={formik.submitForm}
              loading={formik.isSubmitting}
              className="w-100"
              size="large"
              icon={<ArrowRightOutlined />}
            >
              Login
            </Button>
          </Form>
        </FormikProvider>
      </Card>
    </div>
  );
};
