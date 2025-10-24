import { useState } from "react";
import { Button, theme } from "antd";
import { useQuery } from "@tanstack/react-query";
import BoxGridLayout from "../../../components/BoxGridLayout/BoxGridLayout";
import Draggable from "../../../components/Draggable/Draggable";
import Rack from "./Rack";
import { rackDetailsService } from "../../../services/rackDetailsService";
import { RackContext } from "./__context__/useRackContext";
import RackSaveModal from "./modal/RackSaveModal";
import type { FormikHelpers } from "formik";
import type { RackDetailsDTO } from "../../../@types/DTOs/RackDetailsDTO";
import type { BayDetailsGetDTO } from "../../../@types/DTOs/BayDetailsGetDTO";
import LevelSaveModal from "./modal/LevelSaveModal";
import { bayDetailsService } from "../../../services/bayDetailsService";

export default function IndexPage() {
  const [rackSaveModal, setRackSaveModal] = useState<boolean>(false);
  const [levelSaveModal, setLevelSaveModal] = useState<boolean>(false);
  const [selectedRack, setSelectedRack] = useState<RackDetailsDTO | null>(null);
  const [selectedBay, setSelectedBay] = useState<BayDetailsGetDTO | null>(null);

  const { data: rackDetails, refetch } = useQuery({
    queryKey: ["rackDetails"],
    queryFn: async () => {
      const racks = await rackDetailsService.GetAll();

      return racks;
    },
    initialData: [],
  });
  const { token } = theme.useToken();
  const handleDragStop = async (rack: RackDetailsDTO, x: number, y: number) => {
    await rackDetailsService.UpdateRackOnly(rack.id, {
      ...rack,
      locationTop: y,
      locationSide: x,
    });
  };

  const handleResizeStop = async (rack: RackDetailsDTO, ref: any) => {
    await rackDetailsService.UpdateRackOnly(rack.id, {
      ...rack,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  };

  const handleGetBayDetailsMaxShelves = (bayDetails: BayDetailsGetDTO[]) =>
    Math.max(...(bayDetails?.map((b) => b.numberOfShelves || 0) || [0]));

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

  const handleSaveBay = async (
    values: BayDetailsGetDTO,
    formikHelpers: FormikHelpers<BayDetailsGetDTO>
  ) => {
    formikHelpers.setSubmitting(true);
    await bayDetailsService.Update(values?.id, values);
    refetch();
    formikHelpers.setSubmitting(false);
    setLevelSaveModal(false);
  };

  const handleClickNewRack = () => {
    setSelectedRack(null);
    setRackSaveModal(true);
  };
  return (
    <>
      <RackSaveModal
        selectedRack={selectedRack}
        open={rackSaveModal}
        onCancel={() => setRackSaveModal(false)}
        onSubmit={handleSaveRack}
      />
      <LevelSaveModal
        selectedBay={selectedBay}
        open={levelSaveModal}
        onCancel={() => setLevelSaveModal(false)}
        onSubmit={handleSaveBay}
      />
      <RackContext.Provider
        value={{
          refetch,
          rackSaveModal,
          setRackSaveModal,
          selectedRack,
          setSelectedRack,
          selectedBay,
          setSelectedBay,
          levelSaveModal,
          setLevelSaveModal,
        }}
      >
        <div className="mb-2">
          <Button type="primary" onClick={() => handleClickNewRack()}>
            New Rack
          </Button>
        </div>

        <div className="overflow-auto" style={{ height: "80vh" }}>
          <BoxGridLayout id="grid-layout">
            {rackDetails.map((rack) => (
              <Draggable
                key={rack.id}
                bounds="#grid-layout"
                className="shadow-sm rounded"
                style={{
                  backgroundColor: token.colorBgBase,
                }}
                initialX={rack.locationSide || 0}
                initialY={rack.locationTop || 0}
                minHeight={rack.height}
                minWidth={rack.width}
                onDragStop={(_, d) => {
                  handleDragStop(rack, d.x, d.y);
                }}
                onResizeStop={(_, __, ref) => handleResizeStop(rack, ref)}
              >
                <Rack rack={rack} />
              </Draggable>
            ))}
          </BoxGridLayout>
        </div>
      </RackContext.Provider>
    </>
  );
}
