import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { BookingDetails } from "../../../@types/tables/BookingDetails";
import type { GoodsReceipt } from "../../../@types/tables/GoodsReceipt";
import { goodsReceiptService } from "../../../services/goodsReceiptService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { EMPTY_GOODS_RECEIPT } from "./__constants__/EMPTY_GOODS_RECEIPT";
import { goodsReceiptSchema } from "../../../schemas/goodsReceiptSchema";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import InputFormik from "../../../components/Formik/InputFormik";
import type { TabKey } from "./IndexPage";
import usePage from "../../../hooks/usePage";
import { useEffect, useState } from "react";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: BookingDetails | null;
  activeKey: TabKey;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData, activeKey } = props;
  const { title: pageTitle } = usePage();
  const [goodsReceipt, setGoodsReceipt] = useState<GoodsReceipt | null>(null);

  const handleSave = async (
    values: GoodsReceipt,
    formik: FormikHelpers<BookingDetails>
  ) => {
    try {
      formik.setSubmitting(true);

      if (selectedData?.goodsReceiptId) {
        await goodsReceiptService.Update(selectedData.goodsReceiptId, {
          id: selectedData.goodsReceiptId,
          ...values,
        });
      } else {
        await goodsReceiptService.Add({
          ...values,
          bookingDetailsId: selectedData?.id,
        });
      }

      SweetAlert({
        title: `Goods Receipt successfully ${
          activeKey == "Completed" ? "updated" : "added"
        }`,
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
  const handleGetGoodReceipt = async () => {
    const res = await goodsReceiptService.GetById(
      selectedData?.goodsReceiptId ?? 0
    );
    setGoodsReceipt(res);
  };

  const formik = useFormik({
    initialValues:
      activeKey == "Completed" && goodsReceipt
        ? goodsReceipt
        : EMPTY_GOODS_RECEIPT,
    enableReinitialize: true,
    validationSchema: goodsReceiptSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    if (selectedData?.goodsReceiptId == null) return;
    handleGetGoodReceipt();
  }, [selectedData]);

  const title = `${
    activeKey == "Completed" ? "Update" : "Add"
  } ${pageTitle} (ICR: ${selectedData?.icrReferenceNumber})`;

  return (
    <ModalComponent
      title={title}
      open={open}
      onOk={() => formik.submitForm()}
      okText={activeKey == "Completed" ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <InputFormik<GoodsReceipt> label="Reference Number" askterisk name="name" />
      </FormikProvider>
    </ModalComponent>
  );
}
