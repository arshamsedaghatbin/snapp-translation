export interface IDeliveryTimeSlot {
  id?: number;
  active?: boolean | null;
  stratTime?: number | null;
  endTime?: number | null;
}

export class DeliveryTimeSlot implements IDeliveryTimeSlot {
  constructor(public id?: number, public active?: boolean | null, public stratTime?: number | null, public endTime?: number | null) {
    this.active = this.active ?? false;
  }
}

export function getDeliveryTimeSlotIdentifier(deliveryTimeSlot: IDeliveryTimeSlot): number | undefined {
  return deliveryTimeSlot.id;
}
