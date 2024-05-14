import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'region',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbRegion.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/region/region.routes'),
  },
  {
    path: 'country',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbCountry.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/country/country.routes'),
  },
  {
    path: 'location',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbLocation.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/location/location.routes'),
  },
  {
    path: 'department',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbDepartment.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/department/department.routes'),
  },
  {
    path: 'task',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbTask.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/task/task.routes'),
  },
  {
    path: 'employee',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbEmployee.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/employee/employee.routes'),
  },
  {
    path: 'job',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbJob.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/job/job.routes'),
  },
  {
    path: 'job-history',
    data: { pageTitle: 'testJhipsterMongodbApp.testJhipsterMongodbJobHistory.home.title' },
    loadChildren: () => import('./testJhipsterMongodb/job-history/job-history.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
