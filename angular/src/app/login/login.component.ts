import { Router } from '@angular/router';
import { ResponseBody } from './../auth.models';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { LoginBody, RegisterBody } from '../auth.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  $email: string;
  $password: string;
  ngOnInit() {
  }

  onSubmit() {
    this.auth.login(new LoginBody(this.$email, this.$password)).subscribe(
      (res: ResponseBody) => {
        alert(res.msg);
        this.auth.setToken(res.data);
        this.router.navigateByUrl("/todos")
      },
      (err: HttpErrorResponse) => {
        let error = err.error as ResponseBody
        alert(error.msg);
      });
  }

}
