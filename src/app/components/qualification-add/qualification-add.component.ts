import { Component, OnInit } from '@angular/core';
import {Qualification} from "../../model/Qualification";
import {QualificationService} from "../../service/qualification.service";

@Component({
  selector: 'app-qualification-add',
  templateUrl: './qualification-add.component.html',
  styleUrls: ['./qualification-add.component.css']
})
export class QualificationAddComponent implements OnInit {
  qualificationName : string;
  constructor(private qualificationService: QualificationService) {
    this.qualificationName = "";
  }

  ngOnInit(): void {
  }

  add(){
    if (this.qualificationName.length>0){
      this.qualificationService.addQualification(this.qualificationName);
      this.qualificationName = "";
    }
  }

}
