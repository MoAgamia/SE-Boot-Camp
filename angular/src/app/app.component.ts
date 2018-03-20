import { Component, OnInit } from '@angular/core';
import { Todo, TodoList } from "./app.models";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  header: String = "todolist"
  constructor() {
  }
  ngOnInit() {
  }

}
