import { Button, Empty, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import { useSearchParams } from "react-router-dom";

import CompletePicklistTable from "../../picklist/complete/CompleteTable";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import SaveGoodIssueModal from "../SaveGoodIssueModal";
import { goodIssueDetailsService } from "../../../../services/goodIssueDetailsService";
import type { GoodIssueDetails } from "../../../../@types/tables/GoodIssueDetails";
import TableComponent from "../../../../components/Table/TableComponent";
import usePage from "../../../../hooks/usePage";
import type { PickListDetailsRecordGetDTO } from "../../../../@types/DTOs/PickListDetailsRecordGetDTO";
import { pickListDetailsRecordService } from "../../../../services/pickListDetailsRecordService";
import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "../__constants__/EMPTY_FORM";
import PickListDetailsRecordTable from "./PickListDetailsRecordTable";

export default function CompleteTable() {
  const [saveGoodIssueModal, setSaveGoodIssueModal] = useState<boolean>(false);
  const [search, setSearch] = useState<GoodIssueDetails>(EMPTY_FORM);
  const [selectedData, setSelectedData] = useState<GoodIssueDetails | null>(
    null
  );
  const [pickListRecords, setPickListRecords] = useState<
    PickListDetailsRecordGetDTO[]
  >([]);

  const {
    data: goodIssues,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["goodIssues", search],
    queryFn: async () => {
      return await goodIssueDetailsService.GetAll(search);
    },
    initialData: [],
  });
  const { title: pageTitle } = usePage();

  const handleClickEdit = (record: PickListDetails) => {
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

  const handleExpand = async (expanded: boolean, record: GoodIssueDetails) => {
    if (expanded) {
      const res = await pickListDetailsRecordService.GetAll({
        pickListDetailsId: record.pickListDetailsId,
      });
      await setPickListRecords((prev) => [...prev, ...res]);
    } else {
      const filteredCargo = pickListRecords.filter(
        (c) => c.pickListDetailsId !== record.pickListDetailsId
      );
      await setPickListRecords(filteredCargo);
    }
  };

  const columns: TableProps<GoodIssueDetails>["columns"] = [
    {
      title: "GI #",
      dataIndex: "id",
      key: "id",
      render: (value) => `GI-${value}`,
    },
    {
      title: "OCR",
      dataIndex: "ocrNumber",
      key: "ocrNumber",
    },
    {
      title: "PL #",
      dataIndex: "pickListDetailsId",
      key: "pickListDetailsId",
      render: (value) => `PL-${value}`,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "DOF",
      dataIndex: "dofNumber",
      key: "dofNumber",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
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
          {/* <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record)}
          onCancel={() => console.log("Cancelled")}
          okText="Yes"
          cancelText="No"
        >
          <Button
            color="danger"
            shape="circle"
            variant="solid"
            icon={<DeleteOutlined />}
          />
        </Popconfirm> */}
        </div>
      ),
    },
  ];
  return (
    <>
      <SaveGoodIssueModal
        selectedData={selectedData}
        open={saveGoodIssueModal}
        onAfterSave={handleAferSave}
        onCancel={handleCancel}
      />
      <FilterCard onSearch={(val) => setSearch(val)} />
      <TableComponent<GoodIssueDetails>
        indexedColumn={false}
        headerTitle={pageTitle}
        columns={columns}
        dataSource={goodIssues}
        loading={isFetching}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <PickListDetailsRecordTable
              pickListRecords={pickListRecords}
              record={record}
            />
          ),
          onExpand: handleExpand,
        }}
      />
    </>
  );
}
