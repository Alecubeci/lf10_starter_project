import { Injectable } from '@angular/core';
import {CredentialsService} from "./credentials.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private credentialsService: CredentialsService, private router: Router) { }

  canActivate(): boolean{
    if (this.credentialsService.isValidated()){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
