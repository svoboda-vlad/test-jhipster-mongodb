import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 'f07c8cab-3a85-4025-a6c9-2c5830c485eb',
};

export const sampleWithPartialData: ILocation = {
  id: 'eec0d845-aec6-45b4-9cc4-e6923cff2118',
  stateProvince: 'fling furthermore anchored',
};

export const sampleWithFullData: ILocation = {
  id: 'd1cbec0d-fc88-4f91-a400-dde6c35657d8',
  streetAddress: 'indeed',
  postalCode: 'blush brr parenting',
  city: 'Port Merlfurt',
  stateProvince: 'taut obnoxiously',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
