import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/pages/employee-list/employee-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent }
];
