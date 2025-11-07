import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Tooltip, Typography } from "antd";
import Level from "./Level";
import useRackContext from "./__context__/useRackContext";
import { rackDetailsService } from "../../../services/rackDetailsService";
import React from "react";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import type { RackDetails } from "../../../@types/tables/RackDetails";
import type { BayDetails } from "../../../@types/tables/BayDetails";
import useRackQueries from "./__context__/useRackQueries";

type RackProps = {
  rack: RackDetails;
  bayDetails: BayDetails[];
  shelfDetails: ShelfDetails[];
  onClickPallete?: (shelf: ShelfDetails) => void;
};
const { Text } = Typography;
export default React.memo(function Rack({
  rack,
  bayDetails,
  shelfDetails,
  onClickPallete,
}: RackProps) {
  const { setRackSaveModal, setSelectedRack, selectedRack, readonly } =
    useRackContext();

  const { rackQuery } = useRackQueries();

  const handleDelete = async () => {
    await rackDetailsService.Delete(selectedRack?.id);
    rackQuery.refetch();
  };

  const rackDTO = {
    ...rack,
    bayDetails: bayDetails.map((b) => ({
      ...b,
      shelfDetails: shelfDetails.filter((s) => s.bayDetailsId == b.id),
    })),
  };

  const handleClickEdit = () => {
    setRackSaveModal(true);
    setSelectedRack(rackDTO);
  };

  const handleClickDelete = () => {
    setSelectedRack(rackDTO);
  };

  const handleGetShelfDetailsByBayId = (bayId?: number) => {
    return shelfDetails.filter((s) => s.bayDetailsId == bayId) ?? [];
  };

  return (
    <>
      <div className="d-flex align-items-center">
        {!readonly && (
          <>
            <Tooltip title="Edit ">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleClickEdit()}
              />
            </Tooltip>

            <Popconfirm
              title="Delete Confirmation"
              description="Are you sure you want to delete this item?"
              okText="Yes"
              cancelText="No"
              onConfirm={async () => await handleDelete()}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleClickDelete()}
              />
            </Popconfirm>
          </>
        )}
        <Text strong className="mt-1">
          {rack?.description}
        </Text>
      </div>
      <div
        className="gap-1 row p-1"
        style={{
          height: "90%",
        }}
      >
        {bayDetails.map((bay) => (
          <Level
            shelfDetails={handleGetShelfDetailsByBayId(bay.id)}
            onClickPallete={onClickPallete}
          />
        ))}
      </div>
    </>
  );
});
