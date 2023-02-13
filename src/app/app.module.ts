import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ModifyEmployeeComponent} from './components/modify-employee/modify-employee.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {QualificationAddComponent} from './components/qualification-add/qualification-add.component';
import {QualificationListComponent} from './components/qualification-list/qualification-list.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {QualificationsComponent} from './components/qualifications/qualifications.component';
import {AuthGuardService} from "./service/auth-guard.service";
import {CredentialsService} from "./service/credentials.service";
import {EmployeeService} from "./service/employee.service";
import {HTTPCommunicatorService} from "./service/httpcommunicator.service";
import {LoginService} from "./service/login.service";
import {QualificationService} from "./service/qualification.service";
import { EmployeeDisplayComponent } from './components/employee-display/employee-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    QualificationAddComponent,
    QualificationListComponent,
    ModifyEmployeeComponent,
    EmployeesListComponent,
    QualificationsComponent,
    EmployeeDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuardService,
    CredentialsService,
    EmployeeService,
    HTTPCommunicatorService,
    LoginService,
    QualificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
