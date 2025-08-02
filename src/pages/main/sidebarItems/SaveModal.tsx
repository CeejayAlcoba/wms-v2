import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { MasterSidebarMenuItem } from "../../../@types/tables/MasterSidebarMenuItem";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";

import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { useQuery } from "@tanstack/react-query";
import { antIconService } from "../../../services/antIconService";
import SelectFormik from "../../../components/Formik/SelectFormik";
import AntIcon from "../../../components/AntIcon/AntIcon";
import CheckboxFormik from "../../../components/Formik/CheckboxFormik";
import { sidebarMenuItemSchema } from "../../../schemas/sidebarMenuItemSchema";
import { sidebarMenuItemService } from "../../../services/sidebarMenuItemService";
import { sidebarMenuService } from "../../../services/sidebarMenuService";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

type SameModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: MasterSidebarMenuItem | null;
};

export default function SaveModal(props: SameModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const { data: antIcons } = useQuery({
    queryKey: ["antIcons"],
    queryFn: async () => {
      const res = await antIconService.GetAll();
      const result = res?.map((r) => ({
        value: r.id,
        label: (
          <span>
            <AntIcon icon={r.name || ""} /> {r.name}
          </span>
        ),
      }));
      return result;
    },
    initialData: [],
  });

  const { data: sidebarMenus } = useQuery({
    queryKey: ["sidebarMenus"],
    queryFn: async () => {
      return await sidebarMenuService.GetAll();
    },
    initialData: [],
  });

  const handleSave = async (
    values: MasterSidebarMenuItem,
    formik: FormikHelpers<MasterSidebarMenuItem>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await sidebarMenuItemService.Update(values.id, values);
      } else {
        await sidebarMenuItemService.Add(values);
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
    validationSchema: sidebarMenuItemSchema,
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
        <InputFormik<MasterSidebarMenuItem>
          label="Name"
          askterisk
          name="name"
        />
        <SelectFormik<MasterSidebarMenuItem, any>
          label="Sidebar Menu"
          name="sidebarMenuId"
          keyValue="id"
          keyLabel="name"
          option={sidebarMenus}
        />
        <InputFormik<MasterSidebarMenuItem>
          label="Key Name"
          askterisk
          name="keyName"
        />
        <SelectFormik<MasterSidebarMenuItem, any>
          label="Icon"
          name="antIconId"
          keyValue="value"
          keyLabel="label"
          option={antIcons}
        />
        <InputFormik<MasterSidebarMenuItem>
          label="Path"
          askterisk
          name="path"
        />
        <CheckboxFormik<MasterSidebarMenuItem>
          label="Visible to sidebar"
          name="isVisible"
        />
        <CheckboxFormik<MasterSidebarMenuItem>
          label="Accessible to any role"
          name="isAccessibleToAnyRole"
        />
      </FormikProvider>
    </ModalComponent>
  );
}
