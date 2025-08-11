import { Button, Tooltip, type TableProps } from "antd";
import { useQuery, type DefinedUseQueryResult } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { EditOutlined } from "@ant-design/icons";

import { useSearchParams } from "react-router-dom";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import type { PickListDetailsRecordGetDTO } from "../../../../@types/DTOs/PickListDetailsRecordGetDTO";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import usePage from "../../../../hooks/usePage";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import { pickListDetailsRecordService } from "../../../../services/pickListDetailsRecordService";
import SaveGoodIssueModal from "../../goodIssue/SaveGoodIssueModal";
import UpdateModal from "../../goodIssue/pending/UpdateModal";
import FilterCard from "./FilterCard";
import TableComponent from "../../../../components/Table/TableComponent";
import PickListDetailsRecordTable from "./PickListDetailsRecordTable";

type CompleteTableProps = {
  renderAction?: (value: any, record: PickListDetails) => JSX.Element;
  queryResult?: DefinedUseQueryResult<PickListDetails[], Error>;
};

export default function CompleteTable(props: CompleteTableProps) {
  const { renderAction, queryResult } = props;
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [saveGoodIssueModal, setSaveGoodIssueModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<PickListDetails | null>(
    null
  );
  const [pickListRecords, setPickListRecords] = useState<
    PickListDetailsRecordGetDTO[]
  >([]);
  const [search, setSearch] = useState<PickListDetails>(EMPTY_FORM);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { title: pageTitle } = usePage();

  const {
    data: pickListDetails,
    refetch,
    isFetching,
  } = queryResult ??
  useQuery({
    queryKey: ["pickListDetails", search, id],
    queryFn: async () => {
      return await pickListDetailsService.GetAll({
        ...search,
        id: id,
      } as PickListDetailsFilterDTO);
    },
    initialData: [],
  });
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

  const handleSearch = async (value: PickListDetails) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<PickListDetails>["columns"] = [
    {
      title: "Pick List No",
      dataIndex: "id",
      key: "id",
      render: (value) => `PL-${value}`,
    },
    {
      title: "PO Number",
      dataIndex: "pONumber",
      key: "pONumber",
    },
    {
      title: "DO Number",
      dataIndex: "dONumber",
      key: "dONumber",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Sold To",
      dataIndex: "soldTo",
      key: "soldTo",
    },
    {
      title: "Delivered To",
      dataIndex: "deliveredTo",
      key: "deliveredTo",
    },
    {
      title: "Pick Up By",
      dataIndex: "pickUpBy",
      key: "pickUpBy",
    },

    {
      title: "Salesman",
      dataIndex: "salesMan",
      key: "salesMan",
    },
    {
      title: "ocr",
      dataIndex: "ocr",
      key: "ocr",
    },
    {
      title: "goodIssue",
      dataIndex: "goodIssue",
      key: "goodIssue",
      render: (value) =>
        value ? `GI-${value}` : <span className="text-secondary">N/A</span>,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) =>
        renderAction ? (
          renderAction(_, record)
        ) : (
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
          </div>
        ),
    },
  ];

  const handleExpand = async (expanded: boolean, record: PickListDetails) => {
    if (expanded) {
      const res = await pickListDetailsRecordService.GetAll({
        pickListDetailsId: record.id,
      });
      setPickListRecords((prev) => [...prev, ...res]);
    } else {
      const filteredCargo = pickListRecords.filter(
        (c) => c.pickListDetailsId !== record.id
      );
      setPickListRecords(filteredCargo);
    }
  };

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
      <FilterCard onSearch={handleSearch} />
      <TableComponent<PickListDetails>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={pickListDetails}
        loading={isFetching}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <PickListDetailsRecordTable
              pickListRecords={pickListRecords.filter(
                (c) => c.pickListDetailsId == record.id
              )}
            />
          ),
          onExpand: handleExpand,
        }}
      />
    </>
  );
}
