import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { ProfileDTO } from "../../../@types/DTOs/ProfileDTO";
import { profileSchema } from "../../../schemas/profileSchema";
import InputFormik from "../../../components/Formik/InputFormik";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import { Alert, Button, Card, Typography } from "antd";
import {
  CalendarOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { AxiosError } from "axios";
import useAfkHandler from "../../../hooks/useAfkHandler";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { meService } from "../../../services/meService";
import { TOKEN_KEY } from "../../../constants/LOCAL_STORAGE_KEYS";
import useUser from "../../../contexts/useUser";
import ChangePasswordModal from "./ChangePasswordModal";

type EditFormProps = {
  user: ProfileDTO;
  handleSetUser: (value: ProfileDTO | null) => void;
};

const { Title, Text } = Typography;

export default function EditForm({ user, handleSetUser }: EditFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);

  const { setUser } = useUser();
  const handleSubmit = async (
    values: ProfileDTO,
    formikHelpers: FormikHelpers<ProfileDTO>
  ) => {
    try {
      setError(null);
      formikHelpers.setSubmitting(true);
      const { user, token } = await meService.UpdateProfile(values);
      localStorage.setItem(TOKEN_KEY, token);
      setUser(user);
      SweetAlert({
        title: "Profile successfully updated",
      });
    } catch (e: any) {
      const ex: AxiosError = e;
      setError((ex.response?.data as string) ?? "Request failed");
    }
    formikHelpers.setSubmitting(false);
  };

  const formik = useFormik<ProfileDTO>({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: handleSubmit,
  });

  useAfkHandler({
    timeout: 60 * 1000,
    onAfk: () => {
      handleSetUser(null);
      SweetAlert({
        icon: "warning",
        title: "Session ended",
        timer: undefined,
        text: "For security, re-enter your password.",
        showConfirmButton: true,
      });
    },
  });

  return (
    <>
      <ChangePasswordModal
        open={showChangePasswordModal}
        onAfterChange={() => setShowChangePasswordModal(false)}
        onCancel={() => setShowChangePasswordModal(false)}
      />
      <div className="d-flex justify-content-center">
        <Card style={{ width: 700 }}>
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <UserOutlined style={{ fontSize: 36, color: "#1677ff" }} />
            <Title level={3} style={{ marginBottom: 4 }}>
              Edit Profile
            </Title>
            <Text type="secondary">
              Update your account information below. Make sure all details are
              correct before saving.
            </Text>
          </div>
          <FormikProvider value={formik}>
            <Form>
              <div>
                <InputFormik<ProfileDTO>
                  name="username"
                  label="User Name"
                  askterisk
                  prefix={<UserOutlined />}
                />

                <InputFormik<ProfileDTO>
                  name="firstName"
                  label="First Name"
                  askterisk
                  prefix={<UserOutlined />}
                />

                <InputFormik<ProfileDTO>
                  name="lastName"
                  label="Last Name"
                  askterisk
                  prefix={<UserOutlined />}
                />

                <InputFormik<ProfileDTO>
                  name="employeeNumber"
                  label="Employee Number"
                  askterisk
                  prefix={<IdcardOutlined />}
                />

                <DatePickerFormik<ProfileDTO>
                  name="birthday"
                  label="Birthday"
                  askterisk
                  prefix={<CalendarOutlined />}
                />
              </div>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  closable
                  className="mb-3"
                />
              )}
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="primary"
                  danger
                  onClick={() => setShowChangePasswordModal(true)}
                  loading={formik.isSubmitting}
                >
                  Change Password
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => formik.submitForm()}
                  loading={formik.isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </Card>
      </div>
    </>
  );
}
