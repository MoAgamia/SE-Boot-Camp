import { AuthGuard } from './auth-guard.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { ListsService } from "./lists.service";
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'todos', component: TodosComponent }
    ]
  }
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
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    ListsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
