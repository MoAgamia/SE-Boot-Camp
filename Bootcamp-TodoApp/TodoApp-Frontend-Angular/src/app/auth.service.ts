import { LoginBody, RegisterBody } from './auth.models';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
    this.token = window.localStorage.token;
    if (this.token) {
      this.authorized = true;
    } else {
      this.authorized = false;

    }
  }
  private token: string;
  public authorized: boolean;

  getAuthorizationToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    window.localStorage.token = this.token;
    this.authorized = true;
  }

  login(body: LoginBody) {
    let email = body.email;
    let password = body.password;
    return this.http.post(environment.url + "auth/login", { email, password })
  }

  register(body: RegisterBody) {
    let email = body.email;
    let password = body.password;
    let confirmPassword = body.confirmPassword;
    console.log(body)
    return this.http.post(environment.url + "auth/register", { email, password, confirmPassword })
  }
  logout() {
    this.authorized = false;
    this.token = null;
    delete window.localStorage.token;

  }
}
