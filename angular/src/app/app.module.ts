import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodosComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoListsComponent,
    TasksComponent,
    LoginComponent,
    TodosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
