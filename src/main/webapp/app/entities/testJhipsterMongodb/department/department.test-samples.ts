import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: '3f7bcbbb-d406-4985-8405-6d34c452ae03',
  departmentName: 'hat masculinize cloudy',
};

export const sampleWithPartialData: IDepartment = {
  id: '69383550-8c40-4b62-9d19-77713f0e0904',
  departmentName: 'whenever that',
};

export const sampleWithFullData: IDepartment = {
  id: '6c5219b1-f576-4cb3-a106-13eae1c98992',
  departmentName: 'octet',
};

export const sampleWithNewData: NewDepartment = {
  departmentName: 'wide regarding joyfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
