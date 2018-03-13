import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  todos = [];
  all_todos = [];
  input = "";
  currentFilter = "all"

  changeFilter(filter) {
    this.currentFilter = filter;
    this.filter();
  }


  sort() {
    this.todos = this.todos.sort((a, b) => {
      var x = a.name
      var y = b.name
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;

    });
  }

  submit() {
    if (this.input === "") return;
    this.all_todos.push({ name: this.input, completed: false });
    this.input = "";
    this.filter();
  }

  delete(todo) {
    this.all_todos.splice(this.all_todos.indexOf(todo), 1);
    this.filter();
  }

  filter() {
    switch (this.currentFilter) {
      case 'all':
        this.todos = this.all_todos;
        break;
      case 'done':
        this.todos = this.all_todos.filter(todo => todo.completed);
        break;
      case 'not done':
        this.todos = this.all_todos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }
  }

  move(places, index) {
    if (index + places < 0 || index + places >= this.todos.length) return;
    let todoInPlace = this.todos[index + places];
    let todoToBeMoved = this.todos[index];
    this.todos[index] = todoInPlace;
    this.todos[index + places] = todoToBeMoved;
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.filter()

  }

}
