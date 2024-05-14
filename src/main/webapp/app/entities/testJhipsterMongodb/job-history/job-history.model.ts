import dayjs from 'dayjs/esm';
import { IJob } from 'app/entities/testJhipsterMongodb/job/job.model';
import { IDepartment } from 'app/entities/testJhipsterMongodb/department/department.model';
import { IEmployee } from 'app/entities/testJhipsterMongodb/employee/employee.model';
import { Language } from 'app/entities/enumerations/language.model';

export interface IJobHistory {
  id: string;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  language?: keyof typeof Language | null;
  job?: IJob | null;
  department?: IDepartment | null;
  employee?: IEmployee | null;
}

export type NewJobHistory = Omit<IJobHistory, 'id'> & { id: null };
