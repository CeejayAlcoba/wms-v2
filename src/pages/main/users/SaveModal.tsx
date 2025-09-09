import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import usePage from "../../../hooks/usePage";
import { userService } from "../../../services/userService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import InputFormik from "../../../components/Formik/InputFormik";
import { userSchema } from "../../../schemas/userSchema";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { useQuery } from "@tanstack/react-query";
import { roleService } from "../../../services/roleService";
import type { RefRole } from "../../../@types/tables/RefRole";
import type { UserDTO } from "../../../@types/DTOs/UserDTO";
import { userAddSchema } from "../../../schemas/userAddSchema";
import InputPasswordFormik from "../../../components/Formik/InputPasswordFormik";
import type { UserAddDTO } from "../../../@types/DTOs/UserAddDTO";
import { EMPTY_WITH_PASSWORD } from "./__constants__/EMPTY_WITH_PASSWORD";
import CheckboxFormik from "../../../components/Formik/CheckboxFormik";
import useUser from "../../../contexts/useUser";
import type { AxiosError } from "axios";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: UserDTO | null;
  type: "Approve" | "Update" | "Add";
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData, type } = props;
  const { user } = useUser();
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () =>
      await roleService.GetAll({
        isMaster: user?.isMaster ? null : false,
      }),

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
        await userService.Add({ ...values, isApproved: true });
      } else {
        await userService.Approve(values);
      }
      SweetAlert({
        title: `Successfully saved`,
      });
      formik.resetForm();
      onAfterSave();
    } catch (e: any) {
      const ex: AxiosError = e;
      SweetAlert({
        icon: "error",
        timer: undefined,
        showConfirmButton: true,
        title: `${(ex?.response?.data as string) ?? "Request failed"}`,
      });
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
    validationSchema: type == "Add" ? userAddSchema : userSchema,
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
          </div>
          <InputFormik<UserDTO> label="User Name" askterisk name="username" />
          {type == "Add" && (
            <>
              <InputFormik<UserAddDTO>
                label="Employee Number"
                askterisk
                name="employeeNumber"
              />
              <DatePickerFormik<UserAddDTO>
                label="Birthday"
                askterisk
                name="birthday"
              />
              <InputPasswordFormik<UserAddDTO>
                askterisk
                label="Password"
                name="password"
              />

              <InputPasswordFormik<UserAddDTO>
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
          {user?.isMaster && (
            <CheckboxFormik<UserDTO>
              name="isMaster"
              label="Master"
              description={
                <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                  <li>
                    Grants full access to <strong>master features</strong>
                  </li>
                  <li>
                    Only <strong>Master</strong> can <em>update</em> and{" "}
                    <em>delete</em> this information
                  </li>
                  <li>
                    Unrestricted access to <strong>all sidebars</strong>
                  </li>
                </ul>
              }
            />
          )}
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
