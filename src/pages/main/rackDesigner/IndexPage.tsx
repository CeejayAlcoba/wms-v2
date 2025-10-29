import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import type { IPaginationFilter } from "../../../@types/pagination/IPaginationFilter";

type RackDesignerProps = {
  readonly?: boolean;
};

export default function IndexPage({ readonly = false }: RackDesignerProps) {
  const [rackSaveModal, setRackSaveModal] = useState<boolean>(false);
  const [levelSaveModal, setLevelSaveModal] = useState<boolean>(false);
  const [selectedRack, setSelectedRack] = useState<RackDetailsDTO | null>(null);
  const [selectedBay, setSelectedBay] = useState<BayDetailsGetDTO | null>(null);

  const [rackDetails, setRackDetails] = useState<RackDetailsDTO[]>([]);
  const [filter, setFilter] = useState<IPaginationFilter>({
    currentPage: 1,
    pageSize: 1,
  });
  const [totalItems, setTotalItems] = useState<number>(0);

  const refetch = async (isSingle?: boolean) => {
    const result = await rackDetailsService.GetAll(
      isSingle ? { ...filter } : { currentPage: 1, pageSize: totalItems }
    );
    setTotalItems(result?.[0].totalItems);
    if (isSingle) {
      setRackDetails((prev) => [...prev, ...result]);
      setFilter((prev) => ({
        ...prev,
        currentPage: (prev.currentPage || 1) + 1,
      }));
    } else {
      setRackDetails(result);
    }

    return result;
  };
  useQuery({
    queryKey: ["rackDetails"],
    queryFn: async () => {
      if (totalItems < (filter.currentPage || 1) && totalItems != 0) return [];
      return await refetch(true);
    },
    refetchInterval: 1000,
  });

  const { token } = theme.useToken();
  const handleDragStop = async (rack: RackDetailsDTO, x: number, y: number) => {
    await rackDetailsService.UpdateRackOnly(rack.id, {
      ...rack,
      locationTop: y,
      locationSide: x,
    });
  };

  const handleResizeStop = useCallback(
    async (rack: RackDetailsDTO, ref: HTMLElement) => {
      await rackDetailsService.UpdateRackOnly(rack.id, {
        ...rack,
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
    },
    []
  );

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
  const rackStyle = useMemo(
    () => ({
      backgroundColor: token.colorBgBase,
    }),
    [token.colorBgBase]
  );

  return (
    <>
      {/* <RackSaveModal
        selectedRack={selectedRack}
        open={rackSaveModal}
        onCancel={() => setRackSaveModal(false)}
        onSubmit={handleSaveRack}
      /> */}
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
          readonly,
        }}
      >
        {!readonly && (
          <div className="mb-2">
            <Button type="primary" onClick={() => handleClickNewRack()}>
              New Rack
            </Button>
          </div>
        )}

        <div className="overflow-auto" style={{ height: "80vh" }}>
          <BoxGridLayout id="grid-layout">
            {rackDetails.map((rack) => (
              <Draggable
                key={rack.id}
                bounds="#grid-layout"
                className="shadow-sm rounded"
                style={rackStyle}
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
