import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: '67d0ef1e-7576-4c4c-abbb-604008619f44',
};

export const sampleWithPartialData: ICountry = {
  id: '451f8a9c-a1d3-4924-9c45-5242a02e2dc0',
};

export const sampleWithFullData: ICountry = {
  id: 'd26045fe-ba01-4409-aa10-dab343dff294',
  countryName: 'bus swear lunge',
};

export const sampleWithNewData: NewCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
