import { ILocation } from 'app/entities/location/location.model';

export interface IDelivery {
  id?: number;
  price?: number | null;
  origin?: ILocation | null;
  destination?: ILocation | null;
}

export class Delivery implements IDelivery {
  constructor(public id?: number, public price?: number | null, public origin?: ILocation | null, public destination?: ILocation | null) {}
}

export function getDeliveryIdentifier(delivery: IDelivery): number | undefined {
  return delivery.id;
}
