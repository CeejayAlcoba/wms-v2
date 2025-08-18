import React from "react";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import { Alert, Button, Card, Divider, Space, Typography } from "antd";
import {
  ArrowRightOutlined,
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import InputFormik from "../../../components/Formik/InputFormik";
import useUser from "../../../contexts/useUser";
import { useNavigate } from "react-router-dom";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";
import type { UserWithPasswordDTO } from "../../../@types/DTOs/UserWithPasswordDTO";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import HeaderForm from "../HeaderForm";
import { useAuthFormTypeContext } from "../../../contexts/useAuthFormTypeContext";
import { userWithPasswordSchema } from "../../../schemas/userWithPasswordSchema";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefRole } from "../../../@types/tables/RefRole";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/userService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

const { Title, Text } = Typography;

export const SignupForm: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { setType } = useAuthFormTypeContext();

  const handleSignUp = async (
    values: UserWithPasswordDTO,
    formikHelpers: FormikHelpers<UserWithPasswordDTO>
  ) => {
    try {
      await userService.Add(values);
      SweetAlert({
        title: "Registration Successful 🎉",
        text: "Your account has been created successfully. Please wait for administrator approval before logging in.",
        icon: "success",
        showConfirmButton: true,
        timer: undefined,
      });
    } catch (error: any) {
      console.log(error);
      formikHelpers.setStatus(error?.response?.data || "Signup failed.");
    }
  };

  const formik = useFormik<UserWithPasswordDTO>({
    validationSchema: userWithPasswordSchema,
    initialValues: EMPTY_FORM,
    onSubmit: handleSignUp,
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{
          width: 500,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-4">
          <Title level={3}>Create Account</Title>
          <Text type="secondary">Fill in your details to get started</Text>
        </div>

        <FormikProvider value={formik}>
          <Form>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-md-6">
                  <InputFormik<UserWithPasswordDTO>
                    askterisk
                    name="firstName"
                    label="First Name"
                    prefix={<UserOutlined />}
                  />
                </div>
                <div className="col-md-6">
                  <InputFormik<UserWithPasswordDTO>
                    askterisk
                    name="lastName"
                    label="Last Name"
                    prefix={<UserOutlined />}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <InputFormik<UserWithPasswordDTO>
                    askterisk
                    name="employeeNumber"
                    label="Employee Number"
                    prefix={<IdcardOutlined />}
                  />
                </div>
                <div className="col-md-6">
                  <DatePickerFormik<UserWithPasswordDTO>
                    askterisk
                    name="birthday"
                    label="Birthday"
                    suffixIcon={<CalendarOutlined />}
                  />
                </div>
              </div>

              <InputFormik<UserWithPasswordDTO>
                askterisk
                name="username"
                label="Username"
                prefix={<UserOutlined />}
              />

              <InputPasswordFormik<UserWithPasswordDTO>
                askterisk
                label="Password"
                name="password"
                prefix={<LockOutlined />}
              />

              <InputPasswordFormik<UserWithPasswordDTO>
                askterisk
                label="Confirm Password"
                name="confirmPassword"
                prefix={<LockOutlined />}
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
                Sign Up
              </Button>
            </Space>
          </Form>
        </FormikProvider>

        <Divider plain>or</Divider>

        <div className="text-center">
          <Text type="secondary">Already have an account?</Text>
          <Button type="link" onClick={() => setType("login")}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};
