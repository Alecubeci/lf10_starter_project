import {Injectable} from '@angular/core';
import {LoginState} from "../model/LoginState";
import {HTTPCommunicatorService} from "./httpcommunicator.service";
import {CredentialsService} from "./credentials.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginCount: number;
  private lockTimestamp?: Date;
  private currentLogin: boolean;

  constructor(private httpCommunicatorService: HTTPCommunicatorService, private credentialsService: CredentialsService) {
    this.loginCount = 0;
    this.currentLogin = false;
  }

  async login(username: string, password: string): Promise<LoginState> {
    if (this.currentLogin||(this.lockTimestamp && Math.abs(new Date().getTime() - this.lockTimestamp.getTime()) / 1000 < 120)) {
      return LoginState.LOCKED;
    }
    this.currentLogin = true;
    let token = await this.httpCommunicatorService.getBearerToken(username, password);
    if (!token) {
      this.loginCount++;
      if (this.loginCount >= 3) {
        this.lockTimestamp = new Date();
        this.currentLogin = false;
        return LoginState.LOCKED;
      }
      this.currentLogin = false;
      return LoginState.FAIL;
    }
    this.loginCount = 0;
    this.credentialsService.setValidated(token, username);
    this.currentLogin = false;
    return LoginState.SUCCESS;
  }
}
