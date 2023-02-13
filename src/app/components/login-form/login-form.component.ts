import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {LoginState} from "../../model/LoginState";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username: string;
  password: string;
  stateMessage: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = "";
    this.password = "";
    this.stateMessage = "";
  }

  ngOnInit(): void {
  }

  async login() {
    let answer = await this.loginService.login(this.username,this.password);
    switch (answer){
      case LoginState.SUCCESS:
        this.stateMessage = "Successful login, redirecting."
        this.router.navigateByUrl('/employees');
        break;
      case LoginState.LOCKED:
        this.stateMessage = "Too many login attempts, further attempts are disabled for 2 minutes."
        break;
      case LoginState.FAIL:
        this.stateMessage = "Invalid user or password."
        break;
    }
  }

}
