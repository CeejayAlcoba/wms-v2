import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip, Typography } from "antd";
import Level from "./Level";
import type { RackDetailsDTO } from "../../../@types/DTOs/RackDetailsDTO";
import useRackContext from "./__context__/useRackContext";
import { rackDetailsService } from "../../../services/rackDetailsService";

type RackProps = {
  rack: RackDetailsDTO;
};
const { Text } = Typography;
export default function Rack({ rack }: RackProps) {
  const { setRackSaveModal, setSelectedRack, refetch, selectedRack } =
    useRackContext();
  const handleDelete = async () => {
    await rackDetailsService.Delete(selectedRack?.id);
    refetch();
  };

  const handleClickEdit = () => {
    setRackSaveModal(true);
    setSelectedRack(rack);
  };

  const handleClickDelete = () => {
    setSelectedRack(rack);
  };

  return (
    <>
      <div className="d-flex align-items-center">
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
        {rack.bayDetails.map((bay) => (
          <Level bayDetails={bay} />
        ))}
      </div>
    </>
  );
}
