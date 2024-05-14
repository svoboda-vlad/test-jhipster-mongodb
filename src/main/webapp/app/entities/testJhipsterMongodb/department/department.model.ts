import { ILocation } from 'app/entities/testJhipsterMongodb/location/location.model';

export interface IDepartment {
  id: string;
  departmentName?: string | null;
  location?: ILocation | null;
}

export type NewDepartment = Omit<IDepartment, 'id'> & { id: null };
