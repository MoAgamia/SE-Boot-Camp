import { Task } from './app.models';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as AppModels from './auth.models';
@Injectable()
export class ListsService {

  constructor(private http: HttpClient) { }


  getLists() {
    return this.http.get(environment.url + "list/getLists")
  }

  getList(id: string) {
    return this.http.get(environment.url + "list/getLists/" + id)
  }

  createList(name: string) {
    return this.http.post(environment.url + "list/createList", { name })
  }

  updateListName(id: string, name: string) {
    return this.http.patch(environment.url + "list/updateListName/" + id, { name })
  }

  createTaskInList(id: string, description: string) {
    return this.http.patch(environment.url + "list/" + id + "/createTask", { description })
  }

  updateTaskInList(listId: string, taskID: string, description: string, done: boolean) {
    return this.http.patch(environment.url + "list/" + listId + "/updateTask/" + taskID, { description, done })
  }


  deleteTaskInList(listId: string, taskID: string) {
    return this.http.patch(environment.url + "list/" + listId + "/deleteTask/" + taskID, {})
  }

  deleteList(listId: string) {
    return this.http.delete(environment.url + "list/deleteList/" + listId)
  }
}
