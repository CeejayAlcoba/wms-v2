import { useCallback, useMemo, useState } from "react";
import { Button, Card, theme } from "antd";
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
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import type { RackDetails } from "../../../@types/tables/RackDetails";
import { shelfDetailsService } from "../../../services/shelfDetailsService";
import { RackQueries } from "./__context__/useRackQueries";
import type { BayDetails } from "../../../@types/tables/BayDetails";
import type { IPaginationFilter } from "../../../@types/pagination/IPaginationFilter";
import type { ShelfDetailsGetDTO } from "../../../@types/DTOs/ShelfDetailsGetDTO";
import "./RackDesigner.css";

type RackDesignerProps = {
  readonly?: boolean;
  principalId?: number | null;
  onClickPallete?: (shelf: ShelfDetails) => void;
};

export default function RackDesigner({
  readonly = false,
  principalId,
  onClickPallete,
}: RackDesignerProps) {
  const [shelfDetails, setShelfDetails] = useState<ShelfDetailsGetDTO[]>([]);
  const [rackSaveModal, setRackSaveModal] = useState<boolean>(false);
  const [levelSaveModal, setLevelSaveModal] = useState<boolean>(false);
  const [selectedRack, setSelectedRack] = useState<RackDetailsDTO | null>(null);
  const [selectedBay, setSelectedBay] = useState<BayDetailsGetDTO | null>(null);

  const [pagination, setPagination] = useState<IPaginationFilter>({
    currentPage: 1,
    pageSize: 100,
  });
  const { token } = theme.useToken();

  const rackQuery = useQuery({
    queryKey: ["rackDetails"],
    queryFn: async () => {
      return await rackDetailsService.GetAll();
    },
    initialData: [],
  });

  const bayQuery = useQuery({
    queryKey: ["bayDetails"],
    queryFn: async () => {
      return await bayDetailsService.GetAll();
    },
    initialData: [],
  });

  const shelfQuery = useQuery({
    queryKey: ["shelfDetails", principalId],
    queryFn: async () => {
      if (
        shelfDetails.length != 0 &&
        shelfDetails?.[0].totalItems <
          (pagination.currentPage ?? 0) * (pagination.pageSize ?? 0)
      )
        return [];
      const res = await shelfDetailsService.GetAll({
        ...pagination,
        principalId,
      });
      setShelfDetails((prev) => [...prev, ...res]);
      setPagination((res) => ({
        ...res,
        currentPage: (res.currentPage ?? 1) + 1,
      }));

      return res;
    },
    initialData: [],
    refetchInterval: 1000,
  });

  const handleDragStop = async (rack: RackDetails, x: number, y: number) => {
    await rackDetailsService.UpdateRackOnly(rack.id, {
      ...rack,
      locationTop: y,
      locationSide: x,
    });
  };

  const handleResizeStop = useCallback(
    async (rack: RackDetails, ref: HTMLElement) => {
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
    bayQuery.refetch();
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

  const handleGetBayDetailsMaxShelves = useMemo(
    () => (bayDetails: BayDetails[]) =>
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
    rackQuery.refetch();
    bayQuery.refetch();
    shelfQuery.refetch();
    formikHelpers.setSubmitting(false);
    setRackSaveModal(false);
  };

  const handleGetBayDetailsByRackId = (rackId?: number) => {
    return bayQuery.data.filter((b) => b.rackDetailsId == rackId) ?? [];
  };

  if (rackQuery.isLoading) return <Card loading />;

  return (
    <>
      <RackQueries.Provider
        value={{
          rackQuery,
          bayQuery,
          shelfQuery,
        }}
      >
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

          <div
            className={
              !readonly
                ? "overflow-auto"
                : "container-fluid no-vertical-overflow-landscape"
            }
            style={{ height: "80vh" }}
          >
            <BoxGridLayout
              id="grid-layout"
              className={
                readonly ? "grid-background-readonly" : "grid-background"
              }
            >
              {rackQuery.data.map((rack) => (
                <Draggable
                  key={rack.id}
                  bounds="#grid-layout"
                  className="shadow-sm rounded"
                  style={rackStyle}
                  initialX={rack.locationSide || 0}
                  initialY={rack.locationTop || 0}
                  minHeight={rack.height}
                  minWidth={rack.width}
                  enableResizing={!readonly}
                  disableDragging={readonly}
                  onDragStop={(_, d) => {
                    handleDragStop(rack, d.x, d.y);
                  }}
                  onResizeStop={(_, __, ref) => handleResizeStop(rack, ref)}
                >
                  <Rack
                    rack={rack}
                    shelfDetails={shelfDetails}
                    bayDetails={handleGetBayDetailsByRackId(rack.id)}
                    onClickPallete={onClickPallete}
                  />
                </Draggable>
              ))}
            </BoxGridLayout>
          </div>
        </RackContext.Provider>
      </RackQueries.Provider>
    </>
  );
}
