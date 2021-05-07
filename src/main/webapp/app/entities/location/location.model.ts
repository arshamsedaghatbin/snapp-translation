export interface ILocation {
  id?: number;
  lat?: number | null;
  lng?: number | null;
  exactAddress?: string | null;
}

export class Location implements ILocation {
  constructor(public id?: number, public lat?: number | null, public lng?: number | null, public exactAddress?: string | null) {}
}

export function getLocationIdentifier(location: ILocation): number | undefined {
  return location.id;
}
