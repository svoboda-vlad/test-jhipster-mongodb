import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: '5a8135f7-faa2-449e-9a92-06f0a0a5429c',
};

export const sampleWithPartialData: ITask = {
  id: 'f7e7dbee-ccef-48fb-ba50-ce04f2d2dc0b',
  description: 'acorn fatally instead',
};

export const sampleWithFullData: ITask = {
  id: 'f91603b7-3de0-4fe7-b8f1-4af4cc6f7e32',
  title: 'poor contextualise circa',
  description: 'median where huzzah',
};

export const sampleWithNewData: NewTask = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
