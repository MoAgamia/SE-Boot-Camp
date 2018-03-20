import { TodoList, Todo } from './../app.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'TodoLists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.less']
})
export class TodoListsComponent implements OnInit {

  constructor() { }
  newListName: string;
  todoList: TodoList;

  ngOnInit() {
    this.todoList = new TodoList();
  }

  createTodo() {
    //TODO: do this todo
    this.todoList.addTodo(new Todo(this.newListName));
    this.newListName = "";
  }

}
