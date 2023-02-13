import { Injectable } from '@angular/core';
import {BearerToken} from "../model/BearerToken";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private token?: BearerToken;

  private user?: string;

  constructor() { }

  setValidated(token: BearerToken, user: string){
    this.token = token;
    this.user = user;
  }

  isValidated(): boolean{
    return this.token != null && this.user != null;
  }

  getBearerToken(): string{
    if (this.token){
      return <string>this.token.access_token;
    }
    return "";
  }
}
