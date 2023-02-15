import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  backToPreviousSite(){
    this.router.navigateByUrl('/employees');
  }

}
