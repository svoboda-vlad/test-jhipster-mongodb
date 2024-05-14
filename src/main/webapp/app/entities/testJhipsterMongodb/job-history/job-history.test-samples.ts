import dayjs from 'dayjs/esm';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 'b545de2e-30b6-4a0d-94d4-bd3a24d23413',
};

export const sampleWithPartialData: IJobHistory = {
  id: '059257b1-9c57-4161-bdb1-c8b30ff3ceb3',
  startDate: dayjs('2024-05-14T04:04'),
  endDate: dayjs('2024-05-13T23:52'),
};

export const sampleWithFullData: IJobHistory = {
  id: '2ebb12d2-5063-4fe6-9b50-37238f9e8caf',
  startDate: dayjs('2024-05-14T01:00'),
  endDate: dayjs('2024-05-13T20:55'),
  language: 'ENGLISH',
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
