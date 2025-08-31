import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import AntIcon from "../../../components/AntIcon/AntIcon";
import { antIconSchema } from "../../../schemas/antIconSchema";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";
import type { RoleDTO } from "../../../@types/DTOs/RoleDTO";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { MasterSidebarMenuItem } from "../../../@types/tables/MasterSidebarMenuItem";
import { useQuery } from "@tanstack/react-query";
import { sidebarMenuItemService } from "../../../services/sidebarMenuItemService";
import { roleService } from "../../../services/roleService";
import CheckboxFormik from "../../../components/Formik/CheckboxFormik";
import useUser from "../../../contexts/useUser";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RoleDTO | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();
  const { user } = useUser();
  const { data: sidebarItems } = useQuery({
    queryKey: ["sidebarItems"],
    queryFn: async () =>
      await sidebarMenuItemService.GetAll({ isMaster: false }),
    initialData: [],
  });
  const handleSave = async (
    values: RoleDTO,
    formik: FormikHelpers<RoleDTO>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await roleService.Update(values.id, values);
      } else {
        await roleService.Add(values);
      }
      SweetAlert({
        title: `Successfully ${selectedData ? "updated" : "added"}`,
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
    initialValues: selectedData ?? EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: antIconSchema,
    onSubmit: handleSave,
  });

  return (
    <ModalComponent
      title={`${selectedData ? "Update" : "Add"} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
          <div className="d-flex justify-content-center">
            <AntIcon
              icon={formik.values.name ?? ""}
              size={40}
              className="p-2 border border-gray"
            />
          </div>

          <InputFormik<RoleDTO> label="Name" askterisk name="name" />
          <SelectFormik<RoleDTO, MasterSidebarMenuItem>
            mode="multiple"
            label="Sidebar Items"
            askterisk
            name="sidebarMenuItems"
            keyLabel="name"
            keyValue="id"
            option={sidebarItems}
          />
          {user?.isMaster && (
            <CheckboxFormik<RoleDTO>
              askterisk
              label="Master"
              name="isMaster"
              description="Only Master users can edit, update and select this."
            />
          )}
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
