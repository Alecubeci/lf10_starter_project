import { Component } from '@angular/core';
import {Qualification} from "../../model/Qualification";
import {QualificationService} from "../../service/qualification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent{

  constructor(private router: Router, public qualificationService : QualificationService) {

  }

  delete(qualificationName: string) {
    this.qualificationService.deleteQualification(qualificationName);
  }

  filter(qualification: Qualification){
    let qual: string = qualification.designation;
    this.router.navigate(['/employees',qual]);
  }
}
