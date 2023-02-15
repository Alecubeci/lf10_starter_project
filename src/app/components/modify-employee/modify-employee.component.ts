import {Component, OnInit} from '@angular/core';
import {Employee} from "../../model/Employee";
import {EmployeeService} from "../../service/employee.service";
import {QualificationService} from "../../service/qualification.service";
import {Qualification} from "../../model/Qualification";
import {Router} from "@angular/router";
@Component({
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.css']
})
export class ModifyEmployeeComponent implements OnInit {

  editEmployee: Employee;
  selectedQualification?: Qualification;
  constructor(private router:Router, public employeeService:EmployeeService,public qualificationService:QualificationService) {
    this.editEmployee = history.state;
  }

  containsQualification(array: Qualification[], q: Qualification) : boolean {
    return array.some(qual => qual.designation === q.designation);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.editEmployee.id===-1){
      this.employeeService.addEmployee(this.editEmployee);
    }
    else{
      this.employeeService.modifyEmployee(this.editEmployee);
    }
    this.router.navigateByUrl('/employees');
  }
  backToPreviousSite(){
    this.router.navigateByUrl('/employees');
  }

  addQualification(){
    if (this.selectedQualification){
      this.editEmployee.qualifications.push(this.selectedQualification);
      this.selectedQualification = undefined;
    }
  }

  deleteQualification(qualification:Qualification){
    this.editEmployee.qualifications = this.editEmployee.qualifications.filter(q=>q.designation!==qualification.designation);
  }

  deleteEmployee(employee: Employee){
    this.employeeService.deleteEmployee(employee);
  }
}
