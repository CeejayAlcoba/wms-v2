import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PicklistDetailsRecordDTO";
import type { PickListDetailsRecord } from "../../../../@types/tables/PickListDetailsRecord";

export const EMPTY_FORM: PickListDetailsRecordDTO = {
  id: null,
  pickListDetailsId: null,
  cargoDetailsId: null,
  quantity: null,
  cubicMeter: null,
  palleteCount: null,
  pullOutDate: new Date(),
  pullOutDateRecieved: new Date(),
  deliveryDueDate: new Date(),
};
