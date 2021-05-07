import { IDelivery } from 'app/entities/delivery/delivery.model';
import { ITranslationCompany } from 'app/entities/translation-company/translation-company.model';
import { IDeliveryTimeSlot } from 'app/entities/delivery-time-slot/delivery-time-slot.model';
import { IDocument } from 'app/entities/document/document.model';
import { DeliveryType } from 'app/entities/enumerations/delivery-type.model';

export interface IOrder {
  id?: number;
  handOverType?: DeliveryType | null;
  deliveryType?: DeliveryType | null;
  delivery?: IDelivery | null;
  handOver?: IDelivery | null;
  translationCompany?: ITranslationCompany | null;
  deliveryTimeSlot?: IDeliveryTimeSlot | null;
  documents?: IDocument[] | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public handOverType?: DeliveryType | null,
    public deliveryType?: DeliveryType | null,
    public delivery?: IDelivery | null,
    public handOver?: IDelivery | null,
    public translationCompany?: ITranslationCompany | null,
    public deliveryTimeSlot?: IDeliveryTimeSlot | null,
    public documents?: IDocument[] | null
  ) {}
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
