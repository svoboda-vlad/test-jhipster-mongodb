import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 'eb007032-5b65-490f-8f34-6cb4329317c0',
};

export const sampleWithPartialData: IRegion = {
  id: '9fab21d0-abdc-4119-b18e-e9a2deddd20c',
  regionName: 'daily wildly',
};

export const sampleWithFullData: IRegion = {
  id: '7b67a43c-f615-4b1c-84cd-7cad892a3693',
  regionName: 'hatred',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
