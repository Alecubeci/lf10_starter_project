import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {QualificationService} from "../../service/qualification.service";
import {Qualification} from "../../model/Qualification";
import {Employee} from "../../model/Employee";
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  filterQualification?: string;
  filterId?: number;
  emptyEmployee: Employee;

  constructor(private route: ActivatedRoute, public qualificationService: QualificationService) {
    this.emptyEmployee = new Employee(-1,"","","","","","",[]);
    let s =  this.route.snapshot.paramMap.get('qualification');
    if (s){
      this.filterQualification = s;
    }
  }

  ngOnInit(): void {
  }

}
