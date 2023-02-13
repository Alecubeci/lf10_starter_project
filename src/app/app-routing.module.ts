import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {EmployeesListComponent} from "./components/employees-list/employees-list.component";
import {QualificationsComponent} from "./components/qualifications/qualifications.component";
import {ModifyEmployeeComponent} from "./components/modify-employee/modify-employee.component";
import {AuthGuardService} from "./service/auth-guard.service";



const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full'},
  { path: 'employees/:qualification', component: EmployeesListComponent, canActivate: [AuthGuardService] },
  { path: 'employees', component: EmployeesListComponent, canActivate: [AuthGuardService] },
  { path: 'qualifications', component: QualificationsComponent, canActivate: [AuthGuardService] },
  { path: 'modifyEmployee', component: ModifyEmployeeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
