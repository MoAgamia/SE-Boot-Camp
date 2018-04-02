import { ResponseBody } from './../auth.models';
import { Observable } from 'rxjs/Observable';
import { ListsService } from './../lists.service';
import { TodoList, Todo, Task } from './../app.models';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'TodoLists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.less']
})
export class TodoListsComponent implements OnInit {

  constructor(private ls: ListsService) {
    // initialize a new todo
    this.todoList = new TodoList();
  }
  newListName: string;
  todoList: TodoList;
  $todoList: Observable<any>;
  $todoListSub: Subscription;

  ngOnInit() {
    // get list of todos
    this.$todoList = this.ls.getLists()
    //subscribe to the http request
    this.$todoList.subscribe((res: ResponseBody) => {
      // cast results into array of todos
      let lists = res.data as Todo[];
      // loop over each todo
      lists.forEach(element => {
        // for each task in a todo, set the parents
        element.tasks.forEach(task => {
          task.parent = element;
        });
        // add the todo to the todoList object
        this.todoList.addTodo(element);
      });
    })
  }

  // called when the todo/list name is clicked
  startEditingTodo(todo: Todo) {
    // makes the todo/list name editable
    todo.editable = true;
  }

  // inserts new task in a todo/list
  createTask(todo: Todo) {
    // if an empty string was entered as a name, ignore it
    if (todo.newTaskDescription === "") return;
    // call the backend to create the new task
    this.ls.createTaskInList(todo._id, todo.newTaskDescription).subscribe((res: ResponseBody) => {

      //add the task to the views
      let task = new Task(res.data["description"], todo, res.data["_id"]);
      todo.tasks.push(task);

      // reset the input text
      todo.newTaskDescription = ""
    }, console.error);
  }

  // called when the user presses enter while editing a todo/list
  finishEditingTodo(todo: Todo) {
    // sets the todo to be non-editable
    todo.editable = false;
    // calls the backend to update as the frontend is already updated
    this.ls.updateListName(todo._id, todo.name).subscribe(console.log, console.error);
  }


  // create a new todo/list
  createTodo() {
    // call the backend
    this.ls.createList(this.newListName).subscribe(() => {
      // when the backend responds, add it in the frontend
      this.todoList.addTodo(new Todo(this.newListName));
      this.newListName = "";

    }, console.error)
    // reset the input text
  }

  // deletes a todo/list
  removeTodo(todo: Todo) {
    // call the backend to delete the list
    this.ls.deleteList(todo._id).subscribe((res: ResponseBody) => {
      // remove the list from view when backend responds
      this.todoList.removeTodo(todo)
    })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // remove subscription
    // this.$todoListSub.unsubscribe();
  }

}
