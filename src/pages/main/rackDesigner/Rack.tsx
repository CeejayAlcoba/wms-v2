import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip, Typography } from "antd";
import Level from "./Level";
import type { RackDetailsDTO } from "../../../@types/DTOs/RackDetailsDTO";
import useRackContext from "./__context__/useRackContext";
import { rackDetailsService } from "../../../services/rackDetailsService";
import React, { useMemo, useState } from "react";
import RackSaveModal from "./modal/RackSaveModal";
import type { BayDetailsGetDTO } from "../../../@types/DTOs/BayDetailsGetDTO";
import type { FormikHelpers } from "formik";

type RackProps = {
  rack: RackDetailsDTO;
};
const { Text } = Typography;
export default React.memo(function Rack({ rack }: RackProps) {
  const [rackSaveModal, setRackSaveModal] = useState<boolean>(false);
  const { setSelectedRack, refetch, selectedRack, readonly } = useRackContext();
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
  const handleGetBayDetailsMaxShelves = useMemo(
    () => (bayDetails: BayDetailsGetDTO[]) =>
      Math.max(...(bayDetails?.map((b) => b.numberOfShelves || 0) || [0])),
    []
  );
  const handleSaveRack = async (
    values: RackDetailsDTO,
    formikHelpers: FormikHelpers<RackDetailsDTO>
  ) => {
    formikHelpers.setSubmitting(true);

    if (values.id) {
      await rackDetailsService.Update(values.id, values);
    } else {
      await rackDetailsService.Add({
        ...values,
        locationTop: 0,
        locationSide: 0,
        height: 25 * values.bayDetails.length,
        width: 80 * handleGetBayDetailsMaxShelves(values.bayDetails),
      });
    }
    refetch();
    formikHelpers.setSubmitting(false);
    setRackSaveModal(false);
  };
  return (
    <>
      <RackSaveModal
        selectedRack={selectedRack}
        open={rackSaveModal}
        onCancel={() => setRackSaveModal(false)}
        onSubmit={handleSaveRack}
      />
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
        {rack.bayDetails.map((bay) => (
          <Level bayDetails={bay} />
        ))}
      </div>
    </>
  );
});
