import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../model/Employee";
import {Qualification} from "../../model/Qualification";
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  styleUrls: ['./employee-display.component.css']
})
export class EmployeeDisplayComponent implements OnInit {

  @Input() filterId?: number|string;
  @Input() filterQualification?: string;

  constructor(private router: Router, public employeeService: EmployeeService) {
  }

  containsQualification(array: Qualification[], q: string) : boolean {
    return array.some(qual => qual.designation === q);
  }

  ngOnInit(): void {
  }

  editEmployee(employee: Employee){
    this.router.navigateByUrl('/modifyEmployee', { state: employee });
  }

  deleteEmployee(employee: Employee){
    function validate(){

      var element = <HTMLInputElement> document.getElementById("check");
      var isChecked = element.checked;

      if (isChecked){
        alert("checked");
      }
      else {
        alert("Nichts Ausgewählt");
      }
    }
    this.employeeService.deleteEmployee(employee);
  }



}
