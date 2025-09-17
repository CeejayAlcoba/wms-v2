import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery, type DefinedUseQueryResult } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import usePage from "../../../../hooks/usePage";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import { pickListDetailsRecordService } from "../../../../services/pickListDetailsRecordService";
import SaveGoodIssueModal from "../../goodIssue/SaveGoodIssueModal";
import UpdateModal from "../UpdatePickListModal";
import FilterCard from "./FilterCard";
import TableComponent from "../../../../components/Table/TableComponent";
import PickListDetailsRecordTable from "./PickListDetailsRecordTable";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import type { PickListDetailsRecordGetDTO } from "../../../../@types/DTOs/PickListDetailsRecordGetDTO";
import type { PickListDetailsGetDTO } from "../../../../@types/DTOs/PickListDetailsGetDTO";
import SweetAlert from "../../../../components/SweetAlert/SweetAlert";

type CompleteTableProps = {
  renderAdditionalAction?: (
    value: any,
    record: PickListDetailsGetDTO
  ) => JSX.Element;
  queryResult?: DefinedUseQueryResult<PickListDetailsGetDTO[], Error>;
};

export default function CompleteTable(props: CompleteTableProps) {
  const { renderAdditionalAction, queryResult } = props;
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [saveGoodIssueModal, setSaveGoodIssueModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] =
    useState<PickListDetailsGetDTO | null>(null);
  const [pickListRecords, setPickListRecords] = useState<
    PickListDetailsRecordGetDTO[]
  >([]);
  const [search, setSearch] = useState<PickListDetailsFilterDTO>(EMPTY_FORM);
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

  const handleClickEdit = async(record: PickListDetailsGetDTO) => {
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

  const handleDelete = async (record: PickListDetailsGetDTO) => {
    SweetAlert({
      title: "Are you sure?",
      text: `All items in this Picklist ${record.id} will also be deleted!`,
      icon: "warning",
      timer: undefined,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!record.id) throw new Error("Id is null");
          await pickListDetailsService.Delete(record.id);
          SweetAlert({
            title: "Successfully deleted.",
          });
          refetch();
        } catch (e: any) {
          SweetAlert({
            icon: "error",
            title: "Something went wrong!",
            timer: undefined,
            text: e?.response?.data || "",
            showConfirmButton: true,
          });
        }
      }
    });
  };

  const handleSearch = async (value: PickListDetailsFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<PickListDetailsGetDTO>["columns"] = [
    {
      title: "Pick List No",
      dataIndex: "id",
      key: "id",
      render: (value) => `PL-${value}`,
    },
    {
      title: "PO Number",
      dataIndex: "poNumber",
      key: "poNumber",
    },
    {
      title: "DO Number",
      dataIndex: "doNumber",
      key: "doNumber",
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
      title: "Sales Man",
      dataIndex: "salesMan",
      key: "salesMan",
    },
    {
      title: "OCR",
      dataIndex: "ocr",
      key: "ocr",
    },
    {
      title: "Good Issue",
      dataIndex: "goodIssue",
      key: "goodIssue",
      render: (value) =>
        value ? `GI-${value}` : <span className="text-secondary">N/A</span>,
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
          {!record.goodIssue && (
            <Popconfirm
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
            </Popconfirm>
          )}
          {renderAdditionalAction && renderAdditionalAction(_, record)}
        </div>
      ),
    },
  ];

  const handleExpand = async (
    expanded: boolean,
    record: PickListDetailsGetDTO
  ) => {
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

  const handlePaginate = (page: number, pageSize: number) => {
    setSearch((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const handleUnpaginate = async () => {
    await setSearch((prev) => ({
      ...prev,
      currentPage: null,
      pageSize: null,
    }));
    await refetch();
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
      <TableComponent<PickListDetailsGetDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={pickListDetails}
        loading={isFetching}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: pickListDetails?.[0]?.totalItems,
          onChange: handlePaginate,
          current: search.currentPage ?? 1,
          pageSize: search.pageSize ?? 10,
        }}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <PickListDetailsRecordTable
              setPickListRecords={setPickListRecords}
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
