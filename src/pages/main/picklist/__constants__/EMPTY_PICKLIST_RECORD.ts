import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PickListDetailsRecordDTO";

export const EMPTY_PICKLIST_RECORD: PickListDetailsRecordDTO = {
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
