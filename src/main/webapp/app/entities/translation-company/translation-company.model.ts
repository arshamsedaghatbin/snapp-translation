import { ILocation } from 'app/entities/location/location.model';

export interface ITranslationCompany {
  id?: number;
  name?: string | null;
  phoneNumber?: string | null;
  secondPhoneNumber?: string | null;
  location?: ILocation | null;
}

export class TranslationCompany implements ITranslationCompany {
  constructor(
    public id?: number,
    public name?: string | null,
    public phoneNumber?: string | null,
    public secondPhoneNumber?: string | null,
    public location?: ILocation | null
  ) {}
}

export function getTranslationCompanyIdentifier(translationCompany: ITranslationCompany): number | undefined {
  return translationCompany.id;
}
