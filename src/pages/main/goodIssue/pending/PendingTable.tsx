import { Button, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "../__constants__/EMPTY_FORM";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import { useSearchParams } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import SaveGoodIssueModal from "../SaveGoodIssueModal";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import CompeleteTable from "../../picklist/complete/CompleteTable";

export default function PendingTable() {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [saveGoodIssueModal, setSaveGoodIssueModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<PickListDetails | null>(
    null
  );
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const picklistQueryResult = useQuery({
    queryKey: ["pickListDetailsGoodIssue", id],
    queryFn: async () => {
      return await pickListDetailsService.GetAll({
        id: id,
        isNullGoodIssue: true,
      } as PickListDetailsFilterDTO);
    },
    initialData: [],
  });
  const { refetch } = picklistQueryResult;

  const handleClickAdd = (record: PickListDetails) => {
    setSelectedData(record);
    setSaveGoodIssueModal(true);
  };
  const handleClickEdit = (record: PickListDetails) => {
    setSelectedData(record);
    setUpdateModalOpen(true);
  };
  const handleCancel = () => {
    setSelectedData(null);
    setUpdateModalOpen(false);
    setSaveGoodIssueModal(false);
  };

  const handleAferSave = () => {
    setSelectedData(null);
    setUpdateModalOpen(false);
    setSaveGoodIssueModal(false);
    refetch();
  };

  const renderAction = (_: any, record: PickListDetails) => (
    <div className="d-flex gap-1">
      <Tooltip title="Edit">
        <Button
          color="primary"
          shape="circle"
          variant="solid"
          icon={<EditOutlined />}
          onClick={() => handleClickEdit(record)}
        />
      </Tooltip>

      <Tooltip title="Good issue">
        <Button
          className="bg-success text-light"
          shape="circle"
          variant="solid"
          icon={<PlusOutlined />}
          onClick={() => handleClickAdd(record)}
        />
      </Tooltip>
    </div>
  );

  return (
    <>
      <SaveGoodIssueModal
        selectedData={{ ...EMPTY_FORM, pickListDetailsId: selectedData?.id }}
        open={saveGoodIssueModal}
        onAfterSave={handleAferSave}
        onCancel={handleCancel}
      />
      <UpdateModal
        selectedData={selectedData}
        open={updateModalOpen}
        onAfterSave={handleAferSave}
        onCancel={handleCancel}
      />
      <CompeleteTable
        queryResult={picklistQueryResult}
        renderAction={renderAction}
      />
    </>
  );
}
