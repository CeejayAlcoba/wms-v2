import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { MasterSidebarMenu } from "../../../@types/tables/MasterSidebarMenu";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";

import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { sidebarMenuService } from "../../../services/sidebarMenuService";
import { sidebarMenuSchema } from "../../../schemas/sidebarMenuSchema";
import { useQuery } from "@tanstack/react-query";
import { antIconService } from "../../../services/antIconService";
import SelectFormik from "../../../components/Formik/SelectFormik";
import AntIcon from "../../../components/AntIcon/AntIcon";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: MasterSidebarMenu | null;
};

export default function SaveModal(props: SaveModalProps) {
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

  const handleSave = async (
    values: MasterSidebarMenu,
    formik: FormikHelpers<MasterSidebarMenu>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await sidebarMenuService.Update(values.id, values);
      } else {
        await sidebarMenuService.Add(values);
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
    validationSchema: sidebarMenuSchema,
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
        <InputFormik<MasterSidebarMenu> label="Name" askterisk name="name" />
        <SelectFormik<MasterSidebarMenu, any>
          label="Icon"
          name="antIconId"
          keyValue="value"
          keyLabel="label"
          option={antIcons}
        />
      </FormikProvider>
    </ModalComponent>
  );
}
