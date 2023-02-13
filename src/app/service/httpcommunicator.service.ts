import {Injectable} from '@angular/core';
import {BearerToken} from "../model/BearerToken";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Qualification} from "../model/Qualification";
import {CredentialsService} from "./credentials.service";
import {EmployeeQualification} from "../model/EmployeeQualification";
import {Employee} from "../model/Employee";

@Injectable({
  providedIn: 'root'
})
export class HTTPCommunicatorService {

  constructor(private credentialsService: CredentialsService, private http: HttpClient) {
  }

  async getBearerToken(username: string, password: string): Promise<BearerToken | null> {
    let httpParams = new HttpParams()
      .append('grant_type', 'password')
      .append('client_id', 'employee-management-service')
      .append('username', username)
      .append('password', password);
    return await firstValueFrom(this.http.post<BearerToken>('https://authproxy.szut.dev', httpParams, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })).catch((err) => {
      return null;
    });
  }

  async getQualifications(): Promise<Qualification[]> {
    return await firstValueFrom(this.http.get<Qualification[]>('/backend/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return [];
    });
  }

  async addQualification(qualificationName: string) : Promise<Qualification|null>{
    let body: string = JSON.stringify({
      "designation": qualificationName
    });
    return await firstValueFrom(this.http.post<Qualification>('/backend/qualifications', body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }

  async deleteQualification(qualificationName: string) : Promise<Qualification|null>{
    let body: string = JSON.stringify({
      "designation": qualificationName
    });
    return await firstValueFrom(this.http.request<Qualification>('delete','/backend/qualifications', {
      body: body,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }

  async getEmployee(id: number): Promise<Employee|null> {
    return await firstValueFrom(this.http.get<Employee>('/backend/employees/'+id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }

  async getEmployees(): Promise<Employee[]> {
    return await firstValueFrom(this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return []
    });
  }

  async getQualificationsOfEmployee(id: number): Promise<Qualification[]> {
    return await firstValueFrom(this.http.get<EmployeeQualification>('/backend/employees/'+id+'/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).then(s=>{return s.skillSet}, f => {return <Qualification[]>[]});
  }

  async addEmployee(employee: Employee) : Promise<Employee|null>{
    let body: string = JSON.stringify({
      "lastName": employee.lastName,
      "firstName": employee.firstName,
      "street": employee.street,
      "postcode": employee.postcode,
      "city": employee.city,
      "phone": employee.phone
    });
    return await firstValueFrom(this.http.post<Employee>('/backend/employees', body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }

  async modifyEmployee(employee: Employee) : Promise<Employee|null>{
    let body: string = JSON.stringify({
      "lastName": employee.lastName,
      "firstName": employee.firstName,
      "street": employee.street,
      "postcode": employee.postcode,
      "city": employee.city,
      "phone": employee.phone
    });
    return await firstValueFrom(this.http.put<Employee>('/backend/employees/'+employee.id, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }

  async deleteEmployee(id: number) : Promise<Object>{
    return await firstValueFrom(this.http.delete('/backend/employees/'+id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return [];
    });
  }

  async addQualificationToEmployee(id: number, qualification: Qualification): Promise<EmployeeQualification|null> {
    let body: string = JSON.stringify({
      "designation": qualification.designation
    });
    return await firstValueFrom(this.http.post<EmployeeQualification>('/backend/employees/'+id+'/qualifications', body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }

  async removeQualificationFromEmployee(id: number, qualification: Qualification): Promise<EmployeeQualification|null> {
    let body: string = JSON.stringify({
      "designation": qualification.designation
    });
    return await firstValueFrom(this.http.request<EmployeeQualification>('delete','/backend/employees/'+id+'/qualifications', {
      body: body,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.credentialsService.getBearerToken()}`)
    })).catch((err) => {
      return null;
    });
  }
}
