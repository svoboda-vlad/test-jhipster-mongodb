import { IRegion } from 'app/entities/testJhipsterMongodb/region/region.model';

export interface ICountry {
  id: string;
  countryName?: string | null;
  region?: IRegion | null;
}

export type NewCountry = Omit<ICountry, 'id'> & { id: null };
