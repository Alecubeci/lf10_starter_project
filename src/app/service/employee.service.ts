import { Injectable } from '@angular/core';
import {Employee} from "../model/Employee";
import {Qualification} from "../model/Qualification";
import {BehaviorSubject, Observable} from "rxjs";
import {HTTPCommunicatorService} from "./httpcommunicator.service";
import {EmployeeQualification} from "../model/EmployeeQualification";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public readonly employees$: Observable<Employee[]> = this.employees.asObservable();

  constructor(private httpCommunicatorService: HTTPCommunicatorService) {
    this.fillObservable();
  }

  async fillObservable(): Promise<void>{
    let temp: Employee[] = await this.httpCommunicatorService.getEmployees();
    let promises: Promise<Qualification[]>[] = [];
    temp.forEach(e=>{
      promises.push(this.httpCommunicatorService.getQualificationsOfEmployee(e.id));
    })
    let promiseResults: PromiseSettledResult<Qualification[]>[] = await Promise.allSettled(promises);
    temp.forEach((e,i)=>{
      e.qualifications=(<PromiseFulfilledResult<Qualification[]>>promiseResults[i]).value;
    })
    this.employees.next(temp)
  }

  async addEmployee(employee: Employee):Promise<void>{
    let returnedEmployee : Employee | null = await this.httpCommunicatorService.addEmployee(employee);
    if (!returnedEmployee){
      return;
    }
    let idEmployee : Employee = <Employee>returnedEmployee;
    let promises: Promise<EmployeeQualification|null>[] = [];
    employee.qualifications.forEach(q=>{
      promises.push(this.httpCommunicatorService.addQualificationToEmployee((<Employee>idEmployee).id,q));
    })
    let promiseResults: PromiseSettledResult<EmployeeQualification|null>[] =await Promise.allSettled(promises);
    promiseResults.forEach(p=>{
      let resolved = (<PromiseFulfilledResult<EmployeeQualification|null>>p).value;
      if (resolved){
        idEmployee.qualifications = resolved.skillSet;
      }
    })
    idEmployee.qualifications = await this.httpCommunicatorService.getQualificationsOfEmployee(idEmployee.id);
    let newEmployees : Employee[] = this.employees.value;
    newEmployees.push(idEmployee);
    this.employees.next(newEmployees);
  }

  async deleteEmployee(employee: Employee, checkyboxn: boolean):Promise<void>{
    if(checkyboxn){
      await this.httpCommunicatorService.deleteEmployee(employee.id);
      let newEmployees : Employee[] = this.employees.value;
      newEmployees = newEmployees.filter(e=>e.id!==employee.id)
      this.employees.next(newEmployees);
    }
  }

  async modifyEmployee(employee: Employee):Promise<void>{
    let returnedEmployee : Employee | null = await this.httpCommunicatorService.modifyEmployee(employee);
    if (!returnedEmployee){
      return;
    }
    let idEmployee : Employee = <Employee>returnedEmployee;
    idEmployee.qualifications = employee.qualifications;
    let previousQualifications: Qualification[] = await this.httpCommunicatorService.getQualificationsOfEmployee(employee.id);
    let promises: Promise<EmployeeQualification|null>[] = [];
    employee.qualifications.forEach(q=>{
      if (!previousQualifications.some(qual => qual.designation===q.designation)){
        promises.push(this.httpCommunicatorService.addQualificationToEmployee((<Employee>idEmployee).id,q));
      }
    })
    previousQualifications.forEach(q=>{
      if (!employee.qualifications.some(qual => qual.designation===q.designation)){
        promises.push(this.httpCommunicatorService.removeQualificationFromEmployee((<Employee>idEmployee).id,q));
      }
    })
    let promiseResults: PromiseSettledResult<EmployeeQualification|null>[] =await Promise.allSettled(promises);
    promiseResults.forEach(p=>{
      let resolved = (<PromiseFulfilledResult<EmployeeQualification|null>>p).value;
      if (resolved){
        idEmployee.qualifications = resolved.skillSet;
      }
    })
    idEmployee.qualifications = await this.httpCommunicatorService.getQualificationsOfEmployee(idEmployee.id);
    let newEmployees : Employee[] = this.employees.value;
    this.employees.next(newEmployees.map(e => e.id===idEmployee.id? idEmployee : e));
  }

}
