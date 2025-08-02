import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { BillingStatement } from "../../../@types/tables/BillingStatement";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { billingStatementService } from "../../../services/billingStatementService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { billingStatementSchema } from "../../../schemas/billingStatementSchema";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { MasterBillType } from "../../../@types/tables/MasterBillType";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import { principalService } from "../../../services/principalService";
import { billTypeService } from "../../../services/billTypeService";
import { useQuery } from "@tanstack/react-query";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import { PercentageOutlined } from "@ant-design/icons";

type SameModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: BillingStatement | null;
};

export default function SaveModal(props: SameModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });
  const { data: billTypes } = useQuery({
    queryKey: ["billTypes"],
    queryFn: async () => await billTypeService.GetAll(),
    initialData: [],
  });

  const handleSave = async (
    values: BillingStatement,
    formik: FormikHelpers<BillingStatement>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await billingStatementService.Update(values.id, values);
      } else {
        await billingStatementService.Add(values);
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
    validationSchema: billingStatementSchema,
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
        <SelectFormik<BillingStatement, RefPrincipal>
          askterisk
          label="Principal"
          name="principalId"
          keyValue="id"
          keyLabel="name"
          option={principals}
        />
        <div className="row row-cols-lg-2">
          <InputNumberFormik<BillingStatement>
            askterisk
            label="Handling In Rate"
            name="handlingInRate"
            className="col-lg"
          />
          <SelectFormik<BillingStatement, MasterBillType>
            askterisk
            label="/ Per"
            name="handlingInBillTypeId"
            keyValue="id"
            keyLabel="name"
            className="col-lg"
            option={billTypes}
          />
        </div>
        <div className="row row-cols-lg-2">
          <InputNumberFormik<BillingStatement>
            askterisk
            label="Handling Out Rate"
            name="handlingOutRate"
          />
          <SelectFormik<BillingStatement, MasterBillType>
            askterisk
            label="/ Per"
            name="handlingOutBillTypeId"
            keyValue="id"
            keyLabel="name"
            option={billTypes}
          />
        </div>
        <div className="row row-cols-lg-2">
          <InputNumberFormik<BillingStatement>
            askterisk
            label="Storage Rate"
            name="storageRate"
          />
          <SelectFormik<BillingStatement, MasterBillType>
            askterisk
            label="/ Per"
            name="storageBillTypeId"
            keyValue="id"
            keyLabel="name"
            option={billTypes}
          />
        </div>
        <InputNumberFormik<BillingStatement>
          askterisk
          addonAfter={<PercentageOutlined />}
          label="VAT"
          name="valueAddedTax"
        />
      </FormikProvider>
    </ModalComponent>
  );
}
