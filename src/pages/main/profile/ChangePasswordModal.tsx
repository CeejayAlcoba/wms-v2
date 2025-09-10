import { Alert, Form, Modal, Space, Typography, type ModalProps } from "antd";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { ChangePasswordDTO } from "../../../@types/DTOs/ChangePasswordDTO";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";
import { LockOutlined } from "@ant-design/icons";
import { EMPTY_CHANGE_PASSWORD } from "./__constants__/EMPTY_CHANGE_PASSWORD";
import { changeCurrentPasswordSchema } from "../../../schemas/changeCurrentPasswordSchema";
import { meService } from "../../../services/meService";
import type { AxiosError } from "axios";
import useUser from "../../../contexts/useUser";
import { TOKEN_KEY } from "../../../constants/LOCAL_STORAGE_KEYS";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

const { Title, Text } = Typography;

type ChangePasswordModalProps = {
  onAfterChange: () => void;
} & ModalProps;
export default function ChangePasswordModal({
  onAfterChange,
  ...rest
}: ChangePasswordModalProps) {
  const { setUser } = useUser();
  const handleSubmit = async (
    values: ChangePasswordDTO,
    formikHelpers: FormikHelpers<ChangePasswordDTO>
  ) => {
    try {
      const { user, token } = await meService.ChangePassword(values);
      setUser(user);
      localStorage.setItem(TOKEN_KEY, token);
      SweetAlert({
        title: "Password successfully changed",
      });
      formik.resetForm();
      onAfterChange();
    } catch (e: any) {
      const ex: AxiosError = e;

      formikHelpers.setStatus(ex.response?.data ?? "Request Failed");
    }
    formikHelpers.setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: EMPTY_CHANGE_PASSWORD,
    validationSchema: changeCurrentPasswordSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Modal
          {...rest}
          okButtonProps={{
            htmlType: "submit",
            loading: formik.isSubmitting,
            onClick: () => formik.submitForm(),
          }}
          onCancel={(e) => {
            rest.onCancel && rest.onCancel(e);
            formik.resetForm();
          }}
          okText="Change Pasword"
        >
          <div className="text-center mb-4">
            <LockOutlined style={{ fontSize: 36, color: "#1677ff" }} />
            <Title level={3}>Change Password</Title>
            <Text type="secondary">
              Enter your details below to change your password
            </Text>
          </div>

          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <InputPasswordFormik<ChangePasswordDTO>
              askterisk
              name="currentPassword"
              label="Current Password"
              prefix={<LockOutlined />}
              onChange={() => formik.setStatus(null)}
            />
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
              label="Confirm New Password"
              prefix={<LockOutlined />}
              onChange={() => formik.setStatus(null)}
            />

            {formik.status && (
              <Alert
                type={formik.status.includes("sent") ? "success" : "error"}
                message={formik.status}
                showIcon
              />
            )}
          </Space>
        </Modal>
      </Form>
    </FormikProvider>
  );
}
