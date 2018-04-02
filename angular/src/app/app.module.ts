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
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'todos', component: TodosComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
]


@NgModule({
  // declarations are the components which this module contains. You can think of a module declaring a component as 
  // if it is claiming it is the owner of this component. A component can be owned by one and only one module.
  declarations: [
    AppComponent,
    TodoListsComponent,
    TasksComponent,
    LoginComponent,
    TodosComponent,
    RegisterComponent,
  ],
  // imports are other modules like this one that this module depends on. For example, this module imports the HttpClientModule
  // in order to be able to use http requests from the client
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  // providers are the services the module uses.
  providers: [
    httpInterceptorProviders,
    AuthService,
    ListsService,
    AuthGuard
  ],
  // the main component that the app renders
  bootstrap: [AppComponent]
})
export class AppModule { }
