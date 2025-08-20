import SelectFormik from "../../../components/Formik/SelectFormik";
import { useQuery } from "@tanstack/react-query";
import { billTypeService } from "../../../services/billTypeService";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import { PercentageOutlined } from "@ant-design/icons";
import { useEffect, useState, type ReactNode } from "react";
import ToggleText from "../../../components/Toggle/ToggleText";
import { Alert, Typography } from "antd";
import SaveModal from "../billingConfiguration/SaveModal";
import type { BillingConfiguration } from "../../../@types/tables/BillingConfiguration";
import { billingConfigurationService } from "../../../services/billingConfigurationService";
import { useFormikContext } from "formik";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";

type BilltypeOptionProps = {
  id: number;
  name: ReactNode;
};

const { Link } = Typography;

export default function BillingInformation() {
  const [openBillingModal, setOpenBillingModal] = useState<boolean>(false);
  const [billingConfiguration, setBillingConfiguration] =
    useState<BillingConfiguration | null>(null);
  const { getFieldProps, setFieldValue } = useFormikContext<CheckInByICRDTO>();
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

  const fieldName: keyof CheckInByICRDTO = "billingInformation";

  const handleCancelModal = () => {
    setOpenBillingModal(false);
  };
  const handleSetBilling = async () => {
    const principalId = getFieldProps("bookingDetails.principalId").value;
    if (!principalId) return;
    const billing = await billingConfigurationService.GetSingle({
      principalId,
    });

    if (!billing) return;

    setFieldValue(`${fieldName}.handlingInRate`, billing.handlingInRate);
    setFieldValue(
      `${fieldName}.handlingInBillTypeId`,
      billing.handlingInBillTypeId
    );
    setFieldValue(`${fieldName}.handlingOutRate`, billing.handlingOutRate);
    setFieldValue(
      `${fieldName}.handlingOutBillTypeId`,
      billing.handlingOutBillTypeId
    );
    setFieldValue(`${fieldName}.storageRate`, billing.storageRate);
    setFieldValue(`${fieldName}.storageBillTypeId`, billing.storageBillTypeId);
    setFieldValue(`${fieldName}.valueAddedTax`, billing.valueAddedTax);
    setBillingConfiguration(billing);
  };

  const handleAfterSave = () => {
    handleSetBilling();
    setOpenBillingModal(false);
  };

  useEffect(() => {
    handleSetBilling();
  }, [getFieldProps("bookingDetails.principalId").value]);
  return (
    <>
      <SaveModal
        title="Billing Configuration"
        open={openBillingModal}
        onCancel={handleCancelModal}
        onAfterSave={handleAfterSave}
        selectedData={billingConfiguration}
      />
      <Alert
        type="warning"
        message={
          <span>
            If you want to change the principal billing information, please{" "}
            <Link onClick={() => setOpenBillingModal(true)}>click here</Link>.
          </span>
        }
        showIcon
        className="mb-3"
      />

      <div className="row row-cols-lg-2">
        <InputNumberFormik<any>
          askterisk
          label="Handling In Rate"
          name={`${fieldName}.handlingInRate`}
          className="col-lg"
          disabled
        />
        <SelectFormik<any, BilltypeOptionProps>
          askterisk
          label="/ Per"
          name={`${fieldName}.handlingInBillTypeId`}
          keyValue="id"
          keyLabel="name"
          className="col-lg"
          option={billTypes}
          disabled
        />
      </div>

      <div className="row row-cols-lg-2">
        <InputNumberFormik<any>
          askterisk
          label="Handling Out Rate"
          name={`${fieldName}.handlingOutRate`}
          disabled
        />
        <SelectFormik<any, BilltypeOptionProps>
          askterisk
          label="/ Per"
          name={`${fieldName}.handlingOutBillTypeId`}
          keyValue="id"
          keyLabel="name"
          option={billTypes}
          disabled
        />
      </div>

      <div className="row row-cols-lg-2">
        <InputNumberFormik<any>
          askterisk
          label="Storage Rate"
          name={`${fieldName}.storageRate`}
          disabled
        />
        <SelectFormik<any, BilltypeOptionProps>
          askterisk
          label="/ Per"
          name={`${fieldName}.storageBillTypeId`}
          keyValue="id"
          keyLabel="name"
          option={billTypes}
          disabled
        />
      </div>

      <InputNumberFormik<any>
        askterisk
        addonAfter={<PercentageOutlined />}
        label="VAT"
        name={`${fieldName}.valueAddedTax`}
        disabled
      />
    </>
  );
}
