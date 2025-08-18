import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import usePage from "../../../hooks/usePage";
import { userService } from "../../../services/userService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import InputFormik from "../../../components/Formik/InputFormik";
import { userSchema } from "../../../schemas/userSchema";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { useQuery } from "@tanstack/react-query";
import { roleService } from "../../../services/roleService";
import type { RefRole } from "../../../@types/tables/RefRole";
import type { UserDTO } from "../../../@types/DTOs/UserDTO";
import { userWithPasswordSchema } from "../../../schemas/userWithPasswordSchema";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";
import type { UserWithPasswordDTO } from "../../../@types/DTOs/UserWithPasswordDTO";
import { LockOutlined } from "@ant-design/icons";
import { EMPTY_WITH_PASSWORD } from "./__constants__/EMPTY_WITH_PASSWORD";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: UserDTO | null;
  type: "Approve" | "Update" | "Add";
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData, type } = props;
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => roleService.GetAll(),
    initialData: [],
  });
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: UserDTO,
    formik: FormikHelpers<UserDTO>
  ) => {
    try {
      formik.setSubmitting(true);
      if (type == "Update") {
        if (!values.id) throw new Error("Id is null");
        await userService.Update(values.id, values);
      } else if (type == "Add") {
        await userService.Add(values);
      } else {
        await userService.Approve(values);
      }
      SweetAlert({
        title: `Successfully saved`,
      });
      formik.resetForm();
      onAfterSave();
    } catch {
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: selectedData ?? EMPTY_WITH_PASSWORD,
    enableReinitialize: true,
    validationSchema: type == "Add" ? userWithPasswordSchema : userSchema,
    onSubmit: handleSave,
  });

  return (
    <ModalComponent
      title={`${type} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={type}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-2">
            <InputFormik<UserDTO>
              label="First Name"
              askterisk
              name="firstName"
            />
            <InputFormik<UserDTO> label="Last Name" askterisk name="lastName" />

            <InputFormik<UserDTO>
              label="Employee Number"
              askterisk
              name="employeeNumber"
            />
            <DatePickerFormik<UserDTO>
              label="Birthday"
              askterisk
              name="birthday"
            />
          </div>
          <InputFormik<UserDTO> label="User Name" askterisk name="username" />
          {type == "Add" && (
            <>
              <InputPasswordFormik<UserWithPasswordDTO>
                askterisk
                label="Password"
                name="password"
              />

              <InputPasswordFormik<UserWithPasswordDTO>
                askterisk
                label="Confirm Password"
                name="confirmPassword"
              />
            </>
          )}
          <SelectFormik<UserDTO, RefRole>
            mode="multiple"
            label="Roles"
            askterisk
            name="roles"
            keyLabel="name"
            keyValue="id"
            option={roles}
          />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
