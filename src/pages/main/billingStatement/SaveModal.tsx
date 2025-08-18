import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { BillingStatement } from "../../../@types/tables/BillingStatement";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { billingStatementService } from "../../../services/billingStatementService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { billingStatementSchema } from "../../../schemas/billingStatementSchema";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import { principalService } from "../../../services/principalService";
import { billTypeService } from "../../../services/billTypeService";
import { useQuery } from "@tanstack/react-query";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import { PercentageOutlined } from "@ant-design/icons";
import ToggleText from "../../../components/Toggle/ToggleText";
import type { ReactNode } from "react";

type SaveModalProps = {
  title?: string;
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: BillingStatement | null;
};

type BilltypeOptionProps = {
  id: number;
  name: ReactNode;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData, title } = props;
  const { title: pageTitle } = usePage();

  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });
  const { data: billTypes } = useQuery({
    queryKey: ["billTypes"],
    queryFn: async () => {
      const res = await billTypeService.GetAll();
      return res?.map((r) => ({
        id: r.id,
        name: (
          <ToggleText
            data={r.name == "CBM"}
            falseProps={{ style: { color: "green" } }}
          >
            {r.name}
          </ToggleText>
        ),
      })) as BilltypeOptionProps[];
    },
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
      title={`${selectedData ? "Update" : "Add"} ${title ?? pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okButtonProps={{ htmlType: "submit" }}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
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
            <SelectFormik<BillingStatement, BilltypeOptionProps>
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
            <SelectFormik<BillingStatement, BilltypeOptionProps>
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
            <SelectFormik<BillingStatement, BilltypeOptionProps>
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
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
