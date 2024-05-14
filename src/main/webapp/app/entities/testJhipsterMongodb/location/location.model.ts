import { ICountry } from 'app/entities/testJhipsterMongodb/country/country.model';

export interface ILocation {
  id: string;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  country?: ICountry | null;
}

export type NewLocation = Omit<ILocation, 'id'> & { id: null };
