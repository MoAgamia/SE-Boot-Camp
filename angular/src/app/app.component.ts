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

  move(places, index) {
    if (index + places < 0 || index + places >= this.todos.length) return;
    let todoInPlace = this.todos[index + places];
    let todoToBeMoved = this.todos[index];
    this.todos[index] = todoInPlace;
    this.todos[index + places] = todoToBeMoved;
  }

}
