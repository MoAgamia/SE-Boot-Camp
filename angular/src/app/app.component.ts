import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  todos = [];
  input = "";
  submit() {
    this.todos.push(this.input);
    this.input = "";
  }

  delete(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

}
