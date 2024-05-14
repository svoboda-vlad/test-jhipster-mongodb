import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 'c96b4a52-4b72-4a18-a551-2a691c3fd104',
};

export const sampleWithPartialData: IEmployee = {
  id: 'a94d0577-762c-4521-9e8d-85e58028cf82',
  firstName: 'Ila',
  lastName: 'Collier',
  email: 'Aisha_Douglas@yahoo.com',
  phoneNumber: 'beyond daintily fortunately',
};

export const sampleWithFullData: IEmployee = {
  id: '2f5f8a87-3f61-4401-b8a8-f830103adb62',
  firstName: 'Lowell',
  lastName: 'Dach-Ernser',
  email: 'Chris74@gmail.com',
  phoneNumber: 'kiss',
  hireDate: dayjs('2024-05-14T12:10'),
  salary: 14114,
  commissionPct: 25233,
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
