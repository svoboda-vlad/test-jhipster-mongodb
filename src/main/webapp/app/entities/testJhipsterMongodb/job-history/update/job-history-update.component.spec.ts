import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IJob } from 'app/entities/testJhipsterMongodb/job/job.model';
import { JobService } from 'app/entities/testJhipsterMongodb/job/service/job.service';
import { IDepartment } from 'app/entities/testJhipsterMongodb/department/department.model';
import { DepartmentService } from 'app/entities/testJhipsterMongodb/department/service/department.service';
import { IEmployee } from 'app/entities/testJhipsterMongodb/employee/employee.model';
import { EmployeeService } from 'app/entities/testJhipsterMongodb/employee/service/employee.service';
import { IJobHistory } from '../job-history.model';
import { JobHistoryService } from '../service/job-history.service';
import { JobHistoryFormService } from './job-history-form.service';

import { JobHistoryUpdateComponent } from './job-history-update.component';

describe('JobHistory Management Update Component', () => {
  let comp: JobHistoryUpdateComponent;
  let fixture: ComponentFixture<JobHistoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobHistoryFormService: JobHistoryFormService;
  let jobHistoryService: JobHistoryService;
  let jobService: JobService;
  let departmentService: DepartmentService;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, JobHistoryUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(JobHistoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobHistoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobHistoryFormService = TestBed.inject(JobHistoryFormService);
    jobHistoryService = TestBed.inject(JobHistoryService);
    jobService = TestBed.inject(JobService);
    departmentService = TestBed.inject(DepartmentService);
    employeeService = TestBed.inject(EmployeeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Job query and add missing value', () => {
      const jobHistory: IJobHistory = { id: 'CBA' };
      const job: IJob = { id: 'cf314eb0-3221-4e8f-9be6-44345370a968' };
      jobHistory.job = job;

      const jobCollection: IJob[] = [{ id: '5b37e930-8697-4dcc-a9a2-38e318344bf9' }];
      jest.spyOn(jobService, 'query').mockReturnValue(of(new HttpResponse({ body: jobCollection })));
      const additionalJobs = [job];
      const expectedCollection: IJob[] = [...additionalJobs, ...jobCollection];
      jest.spyOn(jobService, 'addJobToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(jobService.query).toHaveBeenCalled();
      expect(jobService.addJobToCollectionIfMissing).toHaveBeenCalledWith(jobCollection, ...additionalJobs.map(expect.objectContaining));
      expect(comp.jobsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Department query and add missing value', () => {
      const jobHistory: IJobHistory = { id: 'CBA' };
      const department: IDepartment = { id: '97f83ce0-3d29-41a1-be6a-86b21f88ec54' };
      jobHistory.department = department;

      const departmentCollection: IDepartment[] = [{ id: '4ec75624-fa3e-4342-a458-ab5695c93283' }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const additionalDepartments = [department];
      const expectedCollection: IDepartment[] = [...additionalDepartments, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentToCollectionIfMissing).toHaveBeenCalledWith(
        departmentCollection,
        ...additionalDepartments.map(expect.objectContaining),
      );
      expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Employee query and add missing value', () => {
      const jobHistory: IJobHistory = { id: 'CBA' };
      const employee: IEmployee = { id: 'ff6e074a-6c3c-438a-9012-e92a36785835' };
      jobHistory.employee = employee;

      const employeeCollection: IEmployee[] = [{ id: 'd741f0d9-d98f-4c5b-8acc-523dc21d64c3' }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining),
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const jobHistory: IJobHistory = { id: 'CBA' };
      const job: IJob = { id: 'eb3dfba4-a74d-420d-b540-d3f4733322d7' };
      jobHistory.job = job;
      const department: IDepartment = { id: '92e23f02-dbdc-448b-b770-71776ec9e9d0' };
      jobHistory.department = department;
      const employee: IEmployee = { id: 'def057ac-3fb8-414b-9683-c50c2040c1e7' };
      jobHistory.employee = employee;

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(comp.jobsSharedCollection).toContain(job);
      expect(comp.departmentsSharedCollection).toContain(department);
      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.jobHistory).toEqual(jobHistory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobHistory>>();
      const jobHistory = { id: 'ABC' };
      jest.spyOn(jobHistoryFormService, 'getJobHistory').mockReturnValue(jobHistory);
      jest.spyOn(jobHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobHistory }));
      saveSubject.complete();

      // THEN
      expect(jobHistoryFormService.getJobHistory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobHistoryService.update).toHaveBeenCalledWith(expect.objectContaining(jobHistory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobHistory>>();
      const jobHistory = { id: 'ABC' };
      jest.spyOn(jobHistoryFormService, 'getJobHistory').mockReturnValue({ id: null });
      jest.spyOn(jobHistoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobHistory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobHistory }));
      saveSubject.complete();

      // THEN
      expect(jobHistoryFormService.getJobHistory).toHaveBeenCalled();
      expect(jobHistoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobHistory>>();
      const jobHistory = { id: 'ABC' };
      jest.spyOn(jobHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobHistoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareJob', () => {
      it('Should forward to jobService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(jobService, 'compareJob');
        comp.compareJob(entity, entity2);
        expect(jobService.compareJob).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDepartment', () => {
      it('Should forward to departmentService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(departmentService, 'compareDepartment');
        comp.compareDepartment(entity, entity2);
        expect(departmentService.compareDepartment).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
