import { Button, Popconfirm, Table, Tooltip, type TableProps } from "antd";
import type { RefProductCategory } from "../../../@types/tables/RefProductCategory";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { productCategoryService } from "../../../services/productCategoryService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";

export default function ProductCategoryPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefProductCategory | null>(
    null
  );
  const [search, setSearch] = useState<RefProductCategory>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: products,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["products", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await productCategoryService.GetAll(
        searchParam as RefProductCategory
      );
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefProductCategory) => {
    setSelectedData(record);
    setSaveModalOpen(true);
  };

  const handleClickAdd = () => {
    setSelectedData(null);
    setSaveModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
  };

  const handleDelete = async (record: RefProductCategory) => {
    if (!record.id) throw new Error("Id is null");
    await productCategoryService.Delete(record.id);
    await refetch();
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleSearch = async (value: RefProductCategory) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefProductCategory>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Action",
      key: "action",
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
        </div>
      ),
    },
  ];

  return (
    <>
      <SaveModal
        open={saveModalOpen}
        onAfterSave={handleAfterSave}
        onCancel={handleClickCancel}
        selectedData={selectedData}
      />
      <FilterCard onSearch={handleSearch} />
      <TableComponent<RefProductCategory>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={products}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
