import { ITask } from 'app/entities/testJhipsterMongodb/task/task.model';
import { IEmployee } from 'app/entities/testJhipsterMongodb/employee/employee.model';

export interface IJob {
  id: string;
  jobTitle?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  tasks?: ITask[] | null;
  employee?: IEmployee | null;
}

export type NewJob = Omit<IJob, 'id'> & { id: null };
