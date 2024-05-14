import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: '5f71dbf9-d246-49c2-8a07-05eab7224c0c',
};

export const sampleWithPartialData: IJob = {
  id: '55088735-36dd-4c06-a5b7-33ae78311517',
  minSalary: 25511,
};

export const sampleWithFullData: IJob = {
  id: '7b43789d-5cb6-4226-848e-b8fb8ae81b95',
  jobTitle: 'Senior Paradigm Architect',
  minSalary: 30984,
  maxSalary: 17738,
};

export const sampleWithNewData: NewJob = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
