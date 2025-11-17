import { Button, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "../__constants__/EMPTY_FORM";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import { useSearchParams } from "react-router-dom";
import SaveGoodIssueModal from "../SaveGoodIssueModal";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import CompeleteTable from "../../picklist/complete/CompleteTable";

export default function PendingTable() {
  const [saveGoodIssueModal, setSaveGoodIssueModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<PickListDetails | null>(
    null
  );

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [search, setSearch] = useState<Partial<PickListDetailsFilterDTO>>({
    id: parseInt(id || "0") || null,
    currentPage: parseInt(searchParams.get("page") || "1"),
    pageSize: parseInt(searchParams.get("pageSize") || "10"),
    isNullGoodIssue: true,
  });

  const picklistQueryResult = useQuery({
    queryKey: ["pickListDetailsGoodIssue", search],
    queryFn: async () => {
      return await pickListDetailsService.GetAll(search);
    },
    initialData: [],
  });
  const { refetch } = picklistQueryResult;

  const handleClickAdd = (record: PickListDetails) => {
    setSelectedData(record);
    setSaveGoodIssueModal(true);
  };
  const handleCancel = () => {
    setSelectedData(null);
    setSaveGoodIssueModal(false);
  };

  const handleAferSave = () => {
    setSelectedData(null);
    setSaveGoodIssueModal(false);
    refetch();
  };

  const renderAdditionalAction = (_: any, record: PickListDetails) => (
    <Tooltip title="Good issue">
      <Button
        className="bg-success text-light"
        shape="circle"
        variant="solid"
        icon={<PlusOutlined />}
        onClick={() => handleClickAdd(record)}
      />
    </Tooltip>
  );

  const handleUnpaginate = async () => {
    await setSearch((prev) => ({
      ...prev,
      currentPage: null,
      pageSize: null,
    }));
  };

  return (
    <>
      <SaveGoodIssueModal
        selectedData={{ ...EMPTY_FORM, pickListDetailsId: selectedData?.id }}
        open={saveGoodIssueModal}
        onAfterSave={handleAferSave}
        onCancel={handleCancel}
      />
      <CompeleteTable
        queryResult={picklistQueryResult}
        renderAdditionalAction={renderAdditionalAction}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
      />
    </>
  );
}
