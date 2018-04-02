import { HttpErrorResponse } from '@angular/common/http';
import { ResponseBody } from './../auth.models';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { RegisterBody } from '../auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  $email: string;
  $password: string;
  ngOnInit() {
  }

  onSubmit() {
    this.auth.register(new RegisterBody(this.$email, this.$password, this.$password)).subscribe(
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
