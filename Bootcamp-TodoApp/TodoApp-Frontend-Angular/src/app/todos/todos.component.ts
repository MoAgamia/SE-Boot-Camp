import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less']
})
export class TodosComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }
  header: String = "todolist"

  ngOnInit() {
    if (!this.as.authorized) {
      this.router.navigate(['/login']);
    }
  }

}
