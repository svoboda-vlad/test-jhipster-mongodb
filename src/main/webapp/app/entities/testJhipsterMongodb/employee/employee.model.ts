import dayjs from 'dayjs/esm';
import { IDepartment } from 'app/entities/testJhipsterMongodb/department/department.model';

export interface IEmployee {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate?: dayjs.Dayjs | null;
  salary?: number | null;
  commissionPct?: number | null;
  manager?: IEmployee | null;
  department?: IDepartment | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
