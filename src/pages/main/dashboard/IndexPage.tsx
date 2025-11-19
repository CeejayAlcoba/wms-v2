import { useState } from "react";
import RackDesigner from "../rackDesigner/RackDesigner";
import ShelfCargoInfoModal from "./modal/ShelfCargoInfoModal";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import Summaries from "./SummaryCards";
import { useQuery } from "@tanstack/react-query";
import { principalService } from "../../../services/principalService";
import { Select } from "antd";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";

const defaultPrincipal: RefPrincipal = {
  id: null,
  name: "All",
  address: "",
};

export default function IndexPage() {
  const [shelfCargoInfoModal, setShelfCargoInfoModal] =
    useState<boolean>(false);
  const [selectedShelfDetails, setSelectedShelfDetails] =
    useState<ShelfDetails | null>(null);

  const [selectedPrincipalId, setSelectedPrincipalId] = useState<number | null>(
    null
  );
  const { data: principals, isLoading } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => {
      const res = await principalService.GetAll();
      return [defaultPrincipal, ...res];
    },
    initialData: [defaultPrincipal],
  });

  return (
    <div>
      <Select
        showSearch
        loading={isLoading}
        style={{ width: "300px", marginBottom: "5px" }}
        onChange={(value) => setSelectedPrincipalId(value)}
        defaultValue={null}
        options={principals.map((p) => ({ value: p.id, label: p.name }))}
      />
      <Summaries principalId={selectedPrincipalId} />
      <ShelfCargoInfoModal
        shelfDetails={selectedShelfDetails}
        open={shelfCargoInfoModal}
        onClose={() => {
          setShelfCargoInfoModal(false);
        }}
        onSubmit={() => {}}
      />

      <RackDesigner
        principalId={selectedPrincipalId}
        readonly
        onClickPallete={(shelf) => {
          setSelectedShelfDetails(shelf);
          setShelfCargoInfoModal(true);
        }}
      />
    </div>
  );
}
